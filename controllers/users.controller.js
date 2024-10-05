const { db } = require("../utils/dbconnection");

const usersCollection = db.collection("users");

const getUsers = async (req, res) => {
  const result = await usersCollection.find().toArray();
  res.send(result);
};

const getSingleUser = async (req, res) => {};

const postUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  const exist = await usersCollection.findOne(query);

  if (exist) {
    return res.send({ message: "user already exists" });
  }

  const result = await usersCollection.insertOne(user);
  res.send(result);
};

module.exports = { getUsers, getSingleUser, postUser };
