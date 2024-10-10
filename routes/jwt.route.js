const express = require("express");
const { postJwtToken } = require("../controllers/jwt.controller");

const router = express.Router();

router.post("/", postJwtToken);

module.exports = router;
