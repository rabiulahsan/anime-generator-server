const express = require("express");
const {
  getUsers,
  postUser,
  getSingleUser,
  updateUser,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/user/:email", getSingleUser);
router.put("/update", updateUser);
router.post("/", postUser);

module.exports = router;
