const { pool } = require("../config/dbconfig");
const queriesuserauth = require("../queries/userauth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const { ulid } = require("ulid");
const { authValidate } = require("../utils/auth");
const bookQueries = require("../queries/book");

//function to get the list of books
const getBooks = async (req, res) => {
  const client = await pool.connect();
  try {
    const auth = await authValidate(req.headers, client);

    logger.info("Enter into get books");
    await client.query("BEGIN");

    const getbook = await client.query(bookQueries.getBook);

    await client.query("COMMIT");
    res.status(200).send({
      status: 200,
      msg: "Books Details Successfully",
      Data: getbook.rows,
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
const bookDetails = async (req, res) => {
  const client = await pool.connect();
  try {
    const auth = await authValidate(req.headers, client);

    logger.info("Enter into get books");

    const book_id = req.params.id;
    const getbook = await client.query(bookQueries.bookDetails, [book_id]);

    if(getbook.rowCount == 0){
      throw new Error("No book found with this id");
    }
    res.status(200).send({
      status: 200,
      msg: "Books Details Successfully",
      Data: getbook.rows,
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
  getBooks,
  bookDetails,
};
