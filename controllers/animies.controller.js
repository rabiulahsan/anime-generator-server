const { db } = require("../utils/dbconnection");
const getImageData = require("../utils/getImageData");
const getImageUrl = require("../utils/getImageUrl");
const { ObjectId } = require("mongodb"); // Import ObjectId from MongoDB

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

// Get a single anime by ID
const getGeneratedAnime = async (req, res) => {
  const { id } = req.params; // Extract the id from URL parameters

  if (!id) {
    return res.status(400).send({ message: "ID parameter is required" });
  }

  try {
    // Convert the id string to ObjectId
    const anime = await animiesCollection.findOne({ _id: new ObjectId(id) });

    if (!anime) {
      return res.status(404).send({ message: "Anime not found" });
    }

    res.send(anime);
  } catch (error) {
    console.error("Error retrieving anime:", error);
    res.status(500).send({ message: "Error retrieving anime" });
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

module.exports = {
  getAnimies,
  generateAnimies,
  getUsersAnimies,
  getGeneratedAnime,
};
