const { db } = require("../utils/dbconnection");

const usersCollection = db.collection("users");

const getUsers = async (req, res) => {
  const result = await usersCollection.find().toArray();
  res.send(result);
};

module.exports = { getUsers };
