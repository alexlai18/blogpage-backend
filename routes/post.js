const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get('/', async (req, res) => {
  // This route is specifically for get all posts
  console.log("Attempting to get all posts from the database");
  try {
    const posts = await Post.find();

    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  // Create a new post
  console.log("Attempting to create a new post");
  try {
    const { title, summary, content, image } = await req.body;
    const newPost = await Post.create({
      title: title,
      summary: summary,
      content: content,
      image: image
    });
    if (newPost) {
      return res.json(newPost);
    } else {
      console.log("Failed to create a new post");
      return res.status(500);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Attempting to get blog post with id ${id}`);
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({message: `Blog post with id ${id} does not exist`})
    }
    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Attempting to get blog post with id ${id}`);
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({message: `Blog post with id ${id} does not exist`})
    }
    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  console.log(`Attempting to delete blog post with id ${id}`);
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    return res.json({ message: "Post Deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Will add functionality to updating blogs later
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Attempting to update post with id ${id}`)
  try {
    const { title, summary, content, image } = await req.body;
    const newPost = await Post.findByIdAndUpdate(id, {
      title: title,
      summary: summary,
      content: content,
      image: image
    });
    if (newPost) {
      return res.json(newPost);
    } else {
      console.log(`Post with id ${id} does not exist`);
      return res.status(404);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;