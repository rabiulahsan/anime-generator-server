const { db } = require("../utils/dbconnection");
const getImageData = require("../utils/getImageData");
const getImageUrl = require("../utils/getImageUrl");

const animiesCollection = db.collection("animies");

//get all animies
const getAnimies = async (req, res) => {
  const result = await animiesCollection.find().toArray();
  res.send(result);
};

//get specific users all generated images
const getUsersAnimies = async (req, res) => {
  const { email } = req.query; // Extract the email from query parameters

  if (!email) {
    return res
      .status(400)
      .send({ message: "Email query parameter is required" });
  }

  try {
    const result = await animiesCollection.find({ email }).toArray(); // Query images based on email
    res.send(result);
  } catch (error) {
    console.error("Error retrieving anime images:", error);
    res.status(500).send({ message: "Error retrieving anime images" });
  }
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

module.exports = { getAnimies, generateAnimies, getUsersAnimies };
