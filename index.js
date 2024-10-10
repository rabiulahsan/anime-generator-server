const express = require("express");
const app = express();
const cors = require("cors");
const { run } = require("./utils/dbconnection");
const userRoutes = require("./routes/users.route");
const animeRoutes = require("./routes/animies.route");
const jwtRoutes = require("./routes/jwt.route");
const verifyJWT = require("./utils/verifyJWT");

require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

run();

//routes
app.use("/users", userRoutes);
app.use("/animies", animeRoutes);
app.use("/jwt", jwtRoutes);

//test
app.get("/", (req, res) => {
  res.send("Running");
});

// Protected route
app.get("/protected", verifyJWT, (req, res) => {
  res.send({ message: "You have access to this protected route." });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
