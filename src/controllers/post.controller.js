const postService = require("../services/postService");

exports.createPost = async (req, res) => {
  const result = await postService.createPost(req.body, req.params.userId);
  return res.status(result.status).json({ message: result.msg });
};

exports.getMyPosts = async (req, res) => {
  const result = await postService.getMyPosts(req.params.userId);
  return res
    .status(result.status)
    .json({ message: result.msg, data: result.data });
};

exports.getPosts = async (req, res) => {
  const result = await postService.getPosts(req.params.userId);
  return res
    .status(result.status)
    .json({ message: result.msg, data: result.data });
};

exports.deletePost = async (req, res) => {
  const result = await postService.deletePost(req.params.postId);
  return res.status(result.status).json({ message: result.msg });
};

exports.updatePost = async (req, res) => {
  const result = await postService.updatePost(req.body, req.params.postId);
  return res.status(result.status).json({ message: result.msg });
};
