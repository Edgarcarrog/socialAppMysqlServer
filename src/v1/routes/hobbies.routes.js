const { Router } = require("express");

const {
  getHobbies,
  createtHobbie,
} = require("../../controllers/hobbie.controller");

const router = Router();

router.get("/hobbies/:userId", getHobbies);

router.post("/hobbies", createtHobbie);

module.exports = router;
