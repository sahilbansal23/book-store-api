const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const queriesuserauth = require("../queries/userauth");

//used to decryupt the headeer-> Authorization
async function decryptheader(header) {
  try {
    const token = header.authorization;
    console.log(token);
    const tokenValue = token ? token.split(" ")[1] : null;

    if (!tokenValue) {
      throw new Error("No token provided");
    }

    const jwtSecretKey = process.env.JWT_SECRET;
    console.log(jwtSecretKey);

    const verified = jwt.verify(tokenValue, jwtSecretKey);

    if (verified) {
      console.log("Token passed Successfully");
      return verified;
    } else {
      throw new Error("Unsuccessful Verification");
    }
  } catch (error) {
    logger.error(error, "error in token");
    throw new Error("Invalid Token");
  }
}

//used to validate the header
async function authValidate(header, client) {
  try {
    const auth = await decryptheader(header);
    const user_id = auth.user_id;
    const isexist = await client.query(queriesuserauth.getUserFromUserid, [
      user_id,
    ]);
    // logger.info(isexist);
    if (isexist.rowCount == 0) {
      //logger.error("No user exits");
      throw new Error("No user exits");
    } else {
      return auth;
    }
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

module.exports = {
  authValidate,
};
