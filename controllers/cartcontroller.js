const { pool } = require("../config/dbconfig");
const queriesCart = require("../queries/cart");
const { get } = require("../routes/authRoutes");
const { authValidate } = require("../utils/auth");
const logger = require("../utils/logger");
const { ulid } = require("ulid");

const getCart = async (req, res) => {
  const client = await pool.connect();
  try {
    const auth = await authValidate(req.headers, client);

    const user_id = auth.user_id;

    logger.info("Enter into get carts");

    const cartDetails = await client.query(queriesCart.userCart, [user_id]);

    res.status(200).send({
      status: 200,
      msg: "Cart details Successfully",
      Data: cartDetails.rows,
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

const addBook = async (req, res) => {
  const client = await pool.connect();
  try {
    const auth = await authValidate(req.headers, client);
    const user_id = auth.user_id;
    const { book_id, qty } = req.body;

    const getUserCart = await client.query(queriesCart.getcart, [user_id]);

    let cart_id = "";
    if (getUserCart.rowCount == 0) {
      const currentTime = Date.now();
      cart_id = ulid();
      const createCart = await client.query(queriesCart.createCart, [
        cart_id,
        user_id,
        currentTime,
        currentTime,
      ]);
    } else {
      cart_id = getUserCart.rows[0].id;
    }
    logger.info("Enter into add book");
    const cart_item_id = ulid();
    const insertBook = await client.query(queriesCart.addBok, [
      cart_item_id,
      cart_id,
      book_id,
      qty,
    ]);

    res.status(200).send({
      status: 200,
      msg: "Cart item added Successfully",
      data: {
        cart_id: cart_id,
        cart_item_id: cart_item_id,
      },
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
const deleteCartBook = async (req, res) => {
  const client = await pool.connect();
  try {
    const auth = await authValidate(req.headers, client);
    const user_id = auth.user_id;
    const cart_item_id = req.params.itemId;

    const deleteCartItem = await client.query(queriesCart.deleteCartItem, [
      cart_item_id,
    ]);
    logger.info("cart item removed successfully");
    res.status(200).send({
      status: 200,
      msg: "Cart item Removed Successfully",
      data: {
        cart_item_id: cart_item_id,
      },
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
module.exports = {
  getCart,
  addBook,
  deleteCartBook,
};
