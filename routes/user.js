const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get('/', async (req, res) => {
  // This route is specifically for get all users
  console.log("Attempting to get all users from the database")
  try {
    const users = await User.find();

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  console.log("Attempting to create a new user")
  try {
    const { name, email, extraInfo } = await req.body;

    const newUser = User.create({
      name: name,
      email: email,
      extraInfo: extraInfo,
      posts: []
    })

    if (newUser) {
      return res.json(newUser);
    } else {
      console.log("Failed to create a new user");
      return res.status(500);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Attempting to get user with id ${id}`);
  try {
    const user = await User.findById(id);

    if (user) {
      return res.json(user);
    } else {
      console.log(`User with id ${id} does not exist`);
      return res.status(404);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Attempting to delete user with id ${id}`);
  try {
    await User.findByIdAndDelete(id);
    return res.json({ message: "User Deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Attempting to update user with id ${id}`);
  try {
    const { name, email, extraInfo } = await req.body;
    const newPost = await Post.findByIdAndUpdate(id, {
      name: name,
      email: email,
      extraInfo: extraInfo,
    });

    if (newPost) {
      return res.json(newPost);
    } else {
      console.log(`User with id ${id} does not exist`);
      return res.status(404);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

module.exports = router;