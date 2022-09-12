const promisePool = require("../database/pool");
const userPool = require("../helpers/userPool");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { generateToken, verifyToken } = require("../helpers/jwt");
const { getTemplate, sendEmail } = require("../config/mail");

//autentica un usuario con su mail y password
const authUser = (body) => {
  const { mail, password } = body;
  let user = null;

  if (!mail || !password) return { status: 400, msg: "Datos incompletos" };
  return userPool
    .getUserByEmail(mail)
    .then((response) => {
      [[user]] = response;
      if (user && user.email_verified === 0)
        throw new Error("El correo no ha sido verificado");

      const correctPass =
        user === undefined
          ? false
          : bcrypt.compareSync(password, user.password);
      if (!correctPass) throw new Error("Usuario o password incorrecto");

      const userId = user.userId;
      const token = generateToken(userId);
      return { status: 200, msg: "Bienvenido", data: token };
    })
    .catch((error) => {
      console.log(error.message);
      return { status: 400, msg: error.message };
    });
};

const createUser = (body) => {
  const { name, password, birthday, mail } = body;
  const userId = uuidv4();
  const passwordHash = bcrypt.hashSync(password, 8);
  const userData = [userId, name, passwordHash, birthday, mail];
  const token = generateToken({ name, mail });
  const template = getTemplate(name, token);

  //Crea un usuario al registrase
  return userPool
    .getUserByEmail(mail)
    .then((response) => {
      const [[user]] = response;
      if (user) throw new Error("Ya existe una cuenta con este email");
      return userPool.createUser(userData);
    })
    .then(() => {
      sendEmail(mail, "Confirma tu correo", template).then(() => {
        console.log("Correo de verificación enviado");
      });
      return { status: 201, msg: "Cuenta creada" };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const deleteUser = async (userId) => {
  try {
    const [result] = await promisePool.query(
      "DELETE FROM users WHERE userId = ?",
      [userId]
    );
    return { status: 200, msg: "Usuario eliminado", result };
  } catch (error) {
    console.log(error.message);
    return { status: 400, msg: error.message };
  }
};

//Obtiene los usuarios a excepción del usuario loggeado
const getAllUsers = (token) => {
  const { payload } = verifyToken(token);
  return userPool
    .getUsers(payload)
    .then((response) => {
      const [data] = response;
      if (!data) throw new Error("No hay más usuarios");
      return { status: 200, msg: "Resultado", data };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

//Obtiene el usuario con el id proporcionado
const getUser = (token) => {
  const { payload } = verifyToken(token);

  return userPool
    .getUserById(payload)
    .then((response) => {
      const [[data]] = response;
      if (!data) throw new Error("Usuario no encontrado");
      return { status: 200, msg: "Usuario encontrado", data };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const updateUser = async (body, userId) => {
  const { name, birthday } = body;
  const sql =
    "UPDATE users SET name = ?, birthday = ? WHERE userId = ?";
  const data = [name, birthday, userId];

  try {
    const [result] = await promisePool.query(sql, data);
    return { status: 200, msg: "Datos actualizados", result };
  } catch (error) {
    console.log(error.message);
    return { status: 400, msg: error.message };
  }
};

const verifyCookie = (token) => {
  const tokenGotten = verifyToken(token);
  //TODO: check
  //console.log(tokenGotten);
  return { status: 200, msg: "Correo verificado", data: tokenGotten };
};

const verifyEmail = (token) => {
  const tokenGotten = verifyToken(token);
  //console.log(tokenGotten);
  try {
    //Revisa si el token ya expiró
    if (!tokenGotten.payload)
      throw new Error("Hubo un error. Envía un nuevo correo de verificación");
    const { mail } = tokenGotten.payload;
    return userPool
      .getUserByEmail(mail)
      .then((response) => {
        const [[user]] = response;
        //Revisa si el correo ha sido verificado anteriormente
        if (user.email_verified)
          throw new Error("El correo ya ha sido verificado anteriormente");

        return userPool.verifyEmail(mail);
      })
      .then(() => {
        return { status: 200, msg: "Correo verificado" };
      })
      .catch((error) => {
        return { status: 200, msg: error.message };
      });
  } catch (error) {
    return { status: 200, msg: error.message };
  }
};

module.exports = {
  authUser,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  verifyCookie,
  verifyEmail,
};
