const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  summary: String,
  content: String,
  image: String
}, {
  timestamps: true
});

module.exports = mongoose.model("posts", PostSchema);