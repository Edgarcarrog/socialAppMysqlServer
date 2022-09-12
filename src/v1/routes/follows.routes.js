const { Router } = require("express");

const {
  createFollow,
  getFollowers,
  getFollowing,
  deleteFollow,
} = require("../../controllers/follow.controller");

const router = Router();

router
  .get("/follows", createFollow)

  .get("/following/:user", getFollowing)

  .get("/followers/:user", getFollowers)

  .delete("/follows/", deleteFollow);

module.exports = router;
