const express = require("express");
const {
  getAnimies,
  generateAnimies,
} = require("../controllers/animies.controller");

const router = express.Router();

router.get("/", getAnimies);
router.post("/generate", generateAnimies);

module.exports = router;
