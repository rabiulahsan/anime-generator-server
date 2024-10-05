const express = require("express");
const {
  getAnimies,
  generateAnimies,
  getUsersAnimies,
} = require("../controllers/animies.controller");

const router = express.Router();

router.get("/", getAnimies);
router.get("/users", getUsersAnimies);
router.post("/generate", generateAnimies);

module.exports = router;
