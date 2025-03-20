const { pool } = require("../config/dbconfig");
const queriesuserauth = require("../queries/userauth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const { ulid } = require("ulid");
const { authValidate } = require("../utils/auth");
const orderQueries = require("../queries/orders");
const { bookDetails } = require("../queries/book");
const { P } = require("pino");

//function to get the list of books
const orderList = async (req, res) => {
  const client = await pool.connect();
  try {
    const auth = await authValidate(req.headers, client);

    const user_id = auth.user_id;

    const orderList = await client.query(orderQueries.orderList, [user_id]);

    res.status(200).send({
      status: 200,
      msg: "order list returned Successfully",
      data: orderList.rows,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error(error);
    res.status(400).send({
      status: 400,
      msg: error.message,
      data: req.body,
    });
  } finally {
    client.release();
  }
};

// Function to get the details  the book
const orderDetails = async (req, res) => {
  const client = await pool.connect();
  try {
    const auth = await authValidate(req.headers, client);
    const order_id = req.params.id;
    const orderDetails = await client.query(orderQueries.orderDetails, [
      order_id,
    ]);

    if (orderDetails.rowCount == 0) {
      throw new Error("No order found with this id");
    }
    res.status(200).send({
      status: 200,
      msg: "Order Details Successfully",
      Data: orderDetails.rows,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).send({
      status: 400,
      msg: error.message,
      data: req.body,
    });
  } finally {
    client.release();
  }
};

const createOrder = async (req, res) => {
  const client = await pool.connect();
  try {
    const auth = await authValidate(req.headers, client);
    const user_id = auth.user_id;
    const currentTime = Date.now();
    const content = req.body;
    const remark = content.remark;
    const order_items = content.order_items;
    await client.query("BEGIN");
    const order_no = ulid();
    const order_id = ulid();

    const create_order = await client.query(orderQueries.addOrder, [
      order_id,
      order_no,
      user_id,
      currentTime,
      currentTime,
      true,
      remark,
    ]);
    for (item of order_items) {
      const { book_id, qty } = item;
      const order_item_id = ulid();
      const getbookrate = await client.query(bookDetails, [book_id]);
      if (getbookrate.rowCount == 0) {
        throw new Error("book does not exists");
      }
      const rate = getbookrate.rows[0].price;

      const addOrderItem = await client.query(orderQueries.addOrderItem, [
        order_item_id,
        book_id,
        order_id,
        rate,
        qty,
      ]);
    }

    await client.query("COMMIT");
    res.status(200).send({
      status: 200,
      msg: "Order Placed Successfully",
      data: {
        order_id: order_id,
      },
    });
  } catch (error) {
    logger.error(error);
    await client.query("ROLLBACK");
    res.status(400).send({
      status: 400,
      msg: error.message,
      data: req.body,
    });
  }
};

module.exports = {
  orderList,
  orderDetails,
  createOrder,
};
