const express = require("express");
const app = express();
const cors = require("cors");
const { run } = require("./utils/dbconnection");
const userRoutes = require("./routes/users.route");
const animeRoutes = require("./routes/animies.route");
const jwtRoutes = require("./routes/jwt.route");
const stripe = require("stripe")(process.env.Stripe_Key);
const { db } = require("./utils/dbconnection");
const verifyJWT = require("./utils/verifyJWT");
const paymentsCollection = db.collection("payments");
const animiesCollection = db.collection("animies");

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

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  console.log(price);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(price * 100),
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post("/payments", verifyJWT, async (req, res) => {
  const paymentDetails = req.body;
  console.log(req.body);

  //todo Check if the decoded email matches the email from the query
  const decodedEmail = req.decoded.email;
  if (paymentDetails.email !== decodedEmail) {
    return res.status(403).send({ error: true, message: "Forbidden access" });
  }

  // insert new payment
  try {
    // Insert new payment into the collection
    const result = await paymentsCollection.insertOne(paymentDetails);

    // Send a success response
    res.status(201).send({
      message: "Payment added to the database",
      result: result,
    });
  } catch (error) {
    // Handle any errors that may occur
    console.error("Error inserting payment:", error);
    res.status(500).send({ error: true, message: "Failed to process payment" });
  }
});

app.get("/payments", verifyJWT, async (req, res) => {
  const { email } = req.query; // Extract the email from query parameters

  if (!email) {
    return res
      .status(400)
      .send({ message: "Email query parameter is required" });
  }

  // Check if the decoded email matches the email from the query
  const decodedEmail = req.decoded.email;
  if (email !== decodedEmail) {
    return res.status(403).send({ error: true, message: "Forbidden access" });
  }

  try {
    const result = await paymentsCollection
      .find({ email })
      .sort({ _id: -1 })
      .toArray(); // Query images based on email
    res.send(result);
  } catch (error) {
    console.error("Error retrieving payments:", error);
    res.status(500).send({ message: "Error retrieving payments" });
  }
});

//searchapi
app.get("/api/search", async (req, res) => {
  const searchQuery = req.query.query;
  console.log(searchQuery);

  if (!searchQuery) {
    return res.status(400).json({ error: "No search query provided" });
  }

  const searchRegex = new RegExp(
    searchQuery + "(s?|ing|er|r|es|ies)",
    "i" // Case-insensitive flag
  );
  const searchResults = await animiesCollection
    .find({
      prompt: { $regex: new RegExp(searchRegex) },
    })
    .toArray();
  res.status(200).send(searchResults);
});

// Protected route
app.get("/protected", verifyJWT, (req, res) => {
  res.send({ message: "You have access to this protected route." });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
