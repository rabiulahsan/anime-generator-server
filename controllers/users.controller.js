const { db } = require("../utils/dbconnection");

const usersCollection = db.collection("users");

//get all users
const getUsers = async (req, res) => {
  const result = await usersCollection.find().toArray();
  res.send(result);
};

//get a specific user
const getSingleUser = async (req, res) => {
  const email = req.params.email; // Get email from request parameters
  const query = { email: email }; // Create query object

  try {
    const user = await usersCollection.findOne(query); // Find user by email
    if (user) {
      res.status(200).send(user); // Send user data if found
    } else {
      res.status(404).send({ message: "User not found" }); // Handle if user is not found
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

//post a user
const postUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  // console.log(query);
  try {
    // Check if the user already exists
    const exist = await usersCollection.findOne(query);
    if (exist) {
      return res.status(409).send({ message: "User already exists" });
    }
    // Insert new user
    const result = await usersCollection.insertOne(user);

    if (result.insertedId) {
      res.status(201).send({
        message: "User created successfully",
        userId: result.insertedId,
      });
    } else {
      res.status(500).send({ message: "Failed to create user" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

module.exports = { getUsers, getSingleUser, postUser };
