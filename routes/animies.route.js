const express = require("express");
const { getAnimies } = require("../controllers/animies.controller");

const router = express.Router();

router.get("/", getAnimies);
router.post("/generate");

module.exports = router;
