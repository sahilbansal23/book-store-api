require("dotenv").config();
const Pool = require("pg-pool");

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DB,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
  max: 15,
});

module.exports = {
  pool,
};
