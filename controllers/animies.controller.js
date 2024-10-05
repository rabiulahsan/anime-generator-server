const { db } = require("../utils/dbconnection");
const getImageData = require("../utils/getImageData");
const getImageUrl = require("../utils/getImageUrl");

const animiesCollection = db.collection("animies");

//get all animies
const getAnimies = async (req, res) => {
  const result = await animiesCollection.find().toArray();
  res.send(result);
};

//generate iamges and post it to database
const generateAnimies = async (req, res) => {
  const { prompt, email } = req?.body;
  const buffer = await getImageData(prompt);
  const imageData = await getImageUrl(buffer, prompt);

  const data = {
    title: imageData?.data.title,
    prompt: prompt,
    email,
    thumb: imageData?.data?.thumb?.url,
    image_url: imageData?.data?.url,
    medium_url: imageData?.data.medium?.url,
  };

  const result = await animiesCollection.insertOne(data);
  res.send(result);
};

module.exports = { getAnimies, generateAnimies };
