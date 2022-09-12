const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
});

const promisePool = pool.promise();

module.exports = promisePool;
