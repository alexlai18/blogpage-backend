require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
const PORT = 5000

mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10
});
const db = mongoose.connection;

app.get('/', (req, res) => {
  res.send('LANDING ROUTE')
});

db.once('open', () => console.log("Connected to Database"));

app.use(express.json());

const postRouter = require("./routes/post");
app.use("/api/v1/post", postRouter);

const userRouter = require("./routes/user");
app.use("/api/v1/user", userRouter);

app.listen(PORT, (err) => {
  if (!err) {
    console.log("🚀 SERVER LISTETNING IN ON PORT 5000 🚀");
  } else {
    console.log("Error occurred, server can't start 😔");
  }
})

module.exports = app;