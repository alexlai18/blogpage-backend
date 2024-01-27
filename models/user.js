const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  extraInfo: String,
  posts: [{type: mongoose.Schema.ObjectId, ref: 'posts'}]
}, {
  timestamps: true
});

module.exports = mongoose.model("users", UserSchema);