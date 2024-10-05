const { db } = require("../utils/dbconnection");

const animiesCollection = db.collection("animies");

//get all animies
const getAnimies = async (req, res) => {
  const result = await animiesCollection.find().toArray();
  res.send(result);
};

module.exports = { getAnimies };
