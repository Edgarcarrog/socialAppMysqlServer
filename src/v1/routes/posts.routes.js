const { Router } = require("express");

const {
  createPost,
  getMyPosts,
  getPosts,
  deletePost,
} = require("../../controllers/post.controller");

const router = Router();

router
  .post("/posts/:userId", createPost)

  .get("/myposts/:userId", getMyPosts)

  .get("/posts/:userId", getPosts)

  .delete("/posts/:postId", deletePost);

module.exports = router;
