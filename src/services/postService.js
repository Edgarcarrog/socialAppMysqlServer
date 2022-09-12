const postPool = require("../helpers/postPool");
//const { verifyToken } = require("../helpers/jwt");
const { v4: uuidv4 } = require("uuid");

const createPost = (body, userId) => {
  const Id = uuidv4();
  const postData = [Id, body.description, userId];

  //Crea un usuario al registrase

  return postPool
    .createPost(postData)
    .then((response) => {
      return { status: 201, msg: "todo bien" };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getMyPosts = (userId) => {
  //Obtiene los Posts del usuario loggeado
  return postPool
    .getMyPosts(userId)
    .then((response) => {
      const [data] = response;
      return { status: 200, msg: response.message, data };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getPosts = (userId) => {
  //Obtiene los Posts de los usuarios a los que seguimos
  return postPool
    .getPosts(userId)
    .then((response) => {
      const [data] = response;
      return { status: 200, msg: response.message, data };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const deletePost = (postId) => {
  //Obtiene los Posts de los usuarios a los que seguimos
  return postPool
    .deletePost(postId)
    .then((response) => {
      return { status: 200, msg: response.message };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

module.exports = {
  createPost,
  getMyPosts,
  getPosts,
  deletePost,
};
