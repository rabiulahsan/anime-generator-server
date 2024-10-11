const express = require("express");
const {
  getUsers,
  postUser,
  getSingleUser,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/user/:email", getSingleUser);
router.post("/", postUser);

module.exports = router;
