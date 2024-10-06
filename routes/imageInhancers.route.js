const express = require("express");
const {
  generateUpscalingImage,
} = require("../controllers/imageInhancers.controller");

const router = express.Router();

router.get("/upscaling", generateUpscalingImage);

module.exports = router;
