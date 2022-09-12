const { Router } = require("express");

const {
  authUser,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  verifyCookie,
  verifyEmail,
} = require("../../controllers/user.controller");

const router = Router();

router
  .get("/users/:userId", getUser)

  .get("/allusers/:userId", getAllUsers)

  .post("/users", createUser)

  .get("/users/confirm/:token", verifyEmail)

  .get("/users/verify-cookie/:cookie", verifyCookie)

  .post("/users/auth", authUser)

  .put("/users/:userId", updateUser)

  .delete("/users/:userId", deleteUser);

module.exports = router;
