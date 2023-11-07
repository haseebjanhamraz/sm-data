const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you've defined the User model

// Route to render the registration form
router.get('/register', (req, res) => {
  res.render('register'); // Render the registration form (register.ejs) in the views directory
});

// Route to handle user registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

module.exports = router;
