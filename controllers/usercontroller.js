const { pool } = require("../config/dbconfig");
const queriesuserauth = require("../queries/userauth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const { ulid } = require("ulid");

//function to create new user
const register = async (req, res) => {
  const client = await pool.connect();
  try {
    const content = req.body;
    const id = ulid();
    logger.info("enter into signup");
    logger.info(content);
    const hashpass = await bcrypt.hash(content.password, 10);
    await client.query("BEGIN");

    const checkUsername = await client.query(
      queriesuserauth.getUserFromUsername,
      [content.username]
    );

    if (checkUsername.rowCount > 0) {
      throw new Error("Username already taken");
    }
    const adduser = await client.query(queriesuserauth.adduser, [
      id,
      content.username,
      hashpass,
      content.name,
      content.email,
      content.phone,
    ]);

    await client.query("COMMIT");
    res.status(200).send({
      status: 200,
      msg: "User Created Successfully",
      Data: req.body,
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

const login = async (req, res) => {
  const client = await pool.connect();
  try {
    const content = req.body;
    const username = content.username;

    let data = await client.query(queriesuserauth.getUserFromUsername, [
      username,
    ]);

    if (data.rowCount == 0) {
      throw new Error("No user found");
    }
    data = data.rows[0];
    const match = await bcrypt.compare(content.password, data.hashpass);

    if (match) {
      console.log("data in login", data);

      // Set token expiration time to 20 min from the current time
      const currentTimeUTC = Date.now();
      const expirationTimeUTC = currentTimeUTC + 120 * 60 * 1000; // 20 minutes in milliseconds

      // Convert expiration time to 13-digit epoch timestamp
      const expirationTimeEpoch = expirationTimeUTC;

      // Sign the token with exp field
      const token = jwt.sign(
        {
          user_id: `${data.id}`,
          username: data.username,
        },
        process.env.JWT_SECRET
      );

      let result = {
        loggedIn: data.status,
        user_id: data.user_id,
        name: data.name,
        token: `Bearer ${token}`,
        exp: expirationTimeEpoch, // Include exp in the response
      };
      console.log("result in login ", result);
      res.status(200).send({
        status: 200,
        msg: "User Login Ssuccessfully",
        Data: result,
      });
    } else {
      throw new Error("Incorrect Password");
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send({ status: 400, msg: error.message, Data: req.body });
  } finally {
    client.release();
  }
};

module.exports = {
  register,
  login,
};
