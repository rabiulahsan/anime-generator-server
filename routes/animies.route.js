const express = require("express");
const {
  getAnimies,
  generateAnimies,
  getUsersAnimies,
  getGeneratedAnime,
} = require("../controllers/animies.controller");
const verifyJWT = require("../utils/verifyJWT");

const router = express.Router();

router.get("/", getAnimies);
router.get("/users", verifyJWT, getUsersAnimies);
router.post("/generate", verifyJWT, generateAnimies);
router.get("/generated/:id", verifyJWT, getGeneratedAnime);

module.exports = router;
