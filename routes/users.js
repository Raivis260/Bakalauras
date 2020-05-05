const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');

const {User} = require('../models/user');

// Login Page
router.get('/login', (req, res) => {
  res.render('login');
})

// Register Page
router.get('/register', (req, res) => {
  res.render('register');
})

// Register handle
router.post('/register', async (req, res) => {
  const { email, password, passwordConfirmitation, adress, zipcode } = req.body;

  let errors = [];

  if (!email || !password || !passwordConfirmitation || !adress || !zipcode) {
    errors.push({msg: 'Please fill in all fields'});
  }

  if (password !== passwordConfirmitation) {
    errors.push({msg: 'Passwords do not match'});
  }

  if (password.length < 6) {
    errors.push({msg: 'Password should be least 6 characters'});
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      email,
      password,
      passwordConfirmitation,
      adress,
      zipcode
    });
  } else {
    // Validation Passed
    let user = await User.findOne({
      email: email
    });

    if (user) {
      errors.push({msg: 'User is already registered'});
      res.render('register', {
        errors,
        email,
        password,
        passwordConfirmitation,
        adress,
        zipcode
      });
    }
    else {
      user = new User({
        email,
        password,
        adress,
        zipcode
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      req.flash('success_msg', 'You are now registered and can log in!');
      res.redirect('/users/login');
    }
  }
});

//Login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
    failureFlash: 'Invalid username or password.'
  })(req, res, next);
});


//Logout handle

router.get('/logout', (req,res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out.');
  res.redirect('/login');
});
module.exports = router;
