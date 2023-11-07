const express = require('express');
const passport = require('passport')
const router = express.Router();
const Item = require('../models/item');
const isAuthenticated = require('../middleware/auth'); // Assuming you have a middleware for authentication


router.get('/login', (req, res) => {
    res.render('login'); // Render the login.ejs file in the views directory
  });
// Route to handle the POST request when the user submits the login form
router.post('/login', passport.authenticate('local', {
    successRedirect: '/form', // Redirect to the form page on successful login
    failureRedirect: '/login', // Redirect back to the login page if authentication fails
    failureFlash: true
  }));

  // Redirect root path to /form
router.get('/', (req, res) => {
    res.redirect('/form');
  });  

// Display form
router.get('/form', isAuthenticated, (req, res) => {
  res.render('form');
});

// Handle form submission
router.post('/form', isAuthenticated, async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      designation: req.body.designation,
      email: req.body.email,
      whatsappNumber: req.body.whatsappNumber,
      phoneNumber: req.body.phoneNumber,
      district: req.body.district,
      tehsil: req.body.tehsil,
      constituency: req.body.constituency,
      candidate: req.body.candidate,
      // Assign other fields here
    });

    await newItem.save();
    res.redirect('/form'); // Redirect to the data view after form submission
  } catch (err) {
    res.send('Error saving to database');
  }
});

// Display data in table form
router.get('/data', isAuthenticated, async (req, res) => {
  try {
    const items = await Item.find();
    res.render('data', { items });
  } catch (err) {
    res.send('Error fetching data');
  }
});

module.exports = router;
