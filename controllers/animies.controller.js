const { db } = require("../utils/dbconnection");
const getImageData = require("../utils/getImageData");
const getImageUrl = require("../utils/getImageUrl");

const animiesCollection = db.collection("animies");

//get all animies
const getAnimies = async (req, res) => {
  const result = await animiesCollection.find().toArray();
  res.send(result);
};

const generateAnimies = async (req, res) => {
  const { prompt, email, category, type } = req?.body;
  const buffer = await getImageData(prompt);
  const imageData = await getImageUrl(buffer, prompt);
  res.send(imageData);
};

module.exports = { getAnimies, generateAnimies };
