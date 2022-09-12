const promisePool = require("../database/pool");

exports.getHobbies = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await promisePool.query(
      "SELECT hobbie FROM hobbies WHERE userId = ?",
      [userId]
    );
    const result = rows.map((row) => row.hobbie);
    res.json({
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createtHobbie = (req, res) => {
  const { hobbies, userId } = req.body;

  hobbies.forEach(async (hobbie) => {
    try {
      await promisePool.query(
        "INSERT INTO hobbies (hobbie, userId) VALUES (?, ?)",
        //otra forma de hacer el query
        // "INSERT INTO users SET name = ?, avatar = ?, birthday = ?, mail = ?",
        [hobbie, userId]
      );
    } catch (error) {
      console.log(error);
    }
  });
  res.json({
    status: "success",
    message: "Guardado en la base de datos",
  });
};
