const userService = require("../services/userService");

exports.authUser = async (req, res) => {
  const result = await userService.authUser(req.body);
  return res
    .status(result.status)
    .json({ message: result.msg, data: result.data });
};

exports.createUser = async (req, res) => {
  const data = await userService.createUser(req.body);
  res.status(data.status).json({ message: data.msg, data: data });
};

exports.deleteUser = async (req, res) => {
  const result = await userService.deleteUser(req.params.userId);
  res.json(result);
};

exports.getAllUsers = async (req, res) => {
  const result = await userService.getAllUsers(req.params.userId);
  res.status(result.status).json({ message: result.msg, data: result.data });
};

exports.getUser = async (req, res) => {
  const result = await userService.getUser(req.params.userId);
  res.status(result.status).json({ message: result.msg, data: result.data });
};

exports.updateUser = async (req, res) => {
  const result = await userService.updateUser(req.body, req.params.userId);
  res.json(result);
};

exports.verifyCookie = async (req, res) => {
  const result = await userService.verifyCookie(req.params.cookie);
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.status(result.status).json({ message: result.msg, data: result.data });
};

exports.verifyEmail = async (req, res) => {
  const result = await userService.verifyEmail(req.params.token);
  res.status(result.status).json({ message: result.msg });
};
