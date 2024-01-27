const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get('/', async (req, res) => {
  // This route is specifically for get all posts
  try {
    console.log("Attempting to get all posts from the database")
    console.log(Post)
    const posts = await Post.find();
    console.log(posts);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  // Create a new post
  try {
    console.log("Attempting to create a new post")
    const { title, summary, content, image } = await req.body;
    const newPost = await Post.create({
      title: title,
      summary: summary,
      content: content,
      image: image
    });
    if (newPost) {
      res.json(newPost);
    } else {
      console.log("Failed to create a new post");
      res.status(500);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = router;