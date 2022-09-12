require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const promisePool = require("./database/pool");
const userRoutes = require("./v1/routes/users.routes");
const followRoutes = require("./v1/routes/follows.routes");
const hobbieRoutes = require("./v1/routes/hobbies.routes");
const postRoutes = require("./v1/routes/posts.routes");
const { urlencoded } = require("express");

//settings
app.set("port", process.env.PORT || 4000);

//middlewares
/* app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
}); */

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
//app.use(urlencoded({ extended: true }));

//routers
app.use("/api/v1", userRoutes);
app.use("/api/v1", followRoutes);
app.use("/api/v1", hobbieRoutes);
app.use("/api/v1", postRoutes);

try {
  /* promisePool.query("DROP TABLE IF EXISTS users"); 
  promisePool.query("DROP TABLE IF EXISTS hobbies");
  promisePool.query("DROP TABLE IF EXISTS follows");
  promisePool.query("DROP TABLE IF EXISTS posts");*/

  promisePool.query("SET lc_time_names = 'es_ES';");

  promisePool.query(
    "CREATE TABLE IF NOT EXISTS users (userId VARCHAR(255) PRIMARY KEY, name VARCHAR(30) DEFAULT NULL, mail VARCHAR(50) DEFAULT NULL, password VARCHAR(255) DEFAULT NULL, birthday DATE DEFAULT NULL, email_verified BOOLEAN NOT NULL)"
  );

  promisePool.query(
    "CREATE TABLE IF NOT EXISTS hobbies (hobbieId INTEGER PRIMARY KEY AUTO_INCREMENT, hobbie INTEGER DEFAULT NULL, userId VARCHAR(255), FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE ON UPDATE CASCADE)"
  );

  promisePool.query(
    "CREATE TABLE IF NOT EXISTS follows (Id VARCHAR(255) PRIMARY KEY, followerId VARCHAR(255), followingId VARCHAR(255), FOREIGN KEY (followerId) REFERENCES users (userId) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (followingId) REFERENCES users (userId) ON DELETE CASCADE ON UPDATE CASCADE)"
  );

  promisePool.query(
    "CREATE TABLE IF NOT EXISTS posts (Id VARCHAR(255) PRIMARY KEY, description VARCHAR(255), user VARCHAR(255), date DATETIME, FOREIGN KEY (user) REFERENCES users (userId) ON DELETE CASCADE ON UPDATE CASCADE)"
  );

  app.listen(app.get("port"), console.log(`Server on port ${app.get("port")}`));
} catch (error) {
  console.log(error);
}
