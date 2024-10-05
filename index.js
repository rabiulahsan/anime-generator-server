const express = require("express");
const app = express();
const cors = require("cors");
const { run } = require("./utils/dbconnection");
const userRoutes = require("./routes/users.route");
const animeRoutes = require("./routes/animies.route");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

run();

//routes
app.use("/users", userRoutes);
app.use("/animies", animeRoutes);

//test
app.get("/", (req, res) => {
  res.send("Running");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
