const { Router } = require("express");

const {
  createPost,
  getMyPosts,
  getPosts,
  deletePost,
  updatePost,
} = require("../../controllers/post.controller");

const router = Router();

router
  .post("/posts/:userId", createPost)

  .get("/myposts/:userId", getMyPosts)

  .get("/posts/:userId", getPosts)

  .put("/posts/:postId", updatePost)

  .delete("/posts/:postId", deletePost);

module.exports = router;
