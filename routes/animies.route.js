const express = require("express");
const {
  getAnimies,
  generateAnimies,
  getUsersAnimies,
  getGeneratedAnime,
} = require("../controllers/animies.controller");

const router = express.Router();

router.get("/", getAnimies);
router.get("/users", getUsersAnimies);
router.post("/generate", generateAnimies);
router.get("/generated/:id", getGeneratedAnime);

module.exports = router;
