const promisePool = require("../database/pool");

const createUser = (user) => {
  const sql =
    "INSERT INTO users SET userId=?, name=?, password=?, birthday=?, mail=?, email_verified=0";
  return promisePool
    .query(sql, user)
    .then((response) => {
      //console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getUserById = (id) => {
  const sql = `SELECT userId, name, birthday FROM users WHERE userId = ?`;
  return promisePool
    .query(sql, [id])
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getUserByEmail = (email) => {
  const sql = `SELECT * FROM users WHERE mail = ?`;
  return promisePool
    .query(sql, [email])
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getUsers = (id) => {
  const sql =
    "SELECT userId, name, birthday FROM users WHERE userId != ? AND email_verified != 0";
  return promisePool
    .query(sql, [id])
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const verifyEmail = (mail) => {
  const sql = "UPDATE users SET email_verified = 1 WHERE mail = ?";
  return promisePool
    .query(sql, [mail])
    .then(() => {})
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
  verifyEmail,
};
