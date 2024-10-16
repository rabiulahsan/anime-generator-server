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
  // console.log(query);
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

//update a user
const updateUser = async (req, res) => {
  const userEmail = req.query.email; // Only email is required
  const userDetails = req.body;

  // Check if email is provided
  if (!userEmail) {
    return res.status(400).send({ error: true, message: "Email is required" });
  }

  //todo Check if the decoded email matches the email from the query
  // const decodedEmail = req.decoded.email;

  // if (userEmail !== decodedEmail) {
  //   return res.status(403).send({ error: true, message: "Forbidden access" });
  // }

  // Use the email to filter the user for updating
  const filter = { email: userEmail };
  const options = { upsert: true }; // Optional: Create new record if not found
  const updatedUserDetails = {
    $set: {
      ...userDetails,
    },
  };

  try {
    // Perform the update and then fetch the updated user
    const result = await usersCollection.updateOne(
      filter,
      updatedUserDetails,
      options
    );

    // If no documents were modified, the user might not exist (unless it's upserted)
    if (result.matchedCount === 0 && !options.upsert) {
      return res.status(404).send({ error: true, message: "User not found" });
    }

    // Fetch the updated user after updating
    const updatedUser = await usersCollection.findOne(filter);

    // Send back the updated user details
    return res.status(200).send(updatedUser);
  } catch (error) {
    // Handle any errors that occur during update or fetching
    return res
      .status(500)
      .send({ error: true, message: "An error occurred during update" });
  }
};

module.exports = { getUsers, getSingleUser, postUser, updateUser };
