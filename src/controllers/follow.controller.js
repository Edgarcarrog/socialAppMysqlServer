const followService = require("../services/followService");

exports.createFollow = async (req, res) => {
  const result = await followService.createFollow(req.query);
  return res.status(result.status).json({ message: result.msg });
};

exports.getFollowing = async (req, res) => {
  const result = await followService.getFollowing(req.params.user);
  return res
    .status(result.status)
    .json({ message: result.msg, data: result.data });
};

exports.getFollowers = async (req, res) => {
  const result = await followService.getFollowers(req.params.user);
  return res
    .status(result.status)
    .json({ message: result.msg, data: result.data });
};

exports.deleteFollow = async (req, res) => {
  const result = await followService.deleteFollow(req.query);
  return res.status(result.status).json({ message: result.msg });
};
