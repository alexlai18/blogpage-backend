const mongoose = require("mongoose");

// Will probably replace author with an ObjectId
const PostSchema = new mongoose.Schema({
  title: String,
  author: String,
  summary: String,
  content: String,
  image: String
}, {
  timestamps: true
});

module.exports = mongoose.model("posts", PostSchema);