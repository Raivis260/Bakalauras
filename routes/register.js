const express = require('express');
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {User,validate} = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('register');
})

router.post('/', async (req, res) => {

  const {error} = validate({
    email: req.body.email,
    password: req.body.password,
    adress: req.body.adress,
    zipcode: req.body.zipcode});

  if (error) return res.status(400).send(error.details[0].message);



  let user = await User.findOne({
    email: req.body.email
  });
  if (user) return res.status(400).send('User already registered.');

  user = new User({
    email: req.body.email,
    password: req.body.password,
    adress: req.body.adress,
    zipcode: req.body.zipcode
  });

  let confirmPassword = req.body.passwordConfirmitation;

  if (user.password === confirmPassword) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    res.redirect('/login');
    await user.save();

    const token = user.generateAuthToken();

  //  res.setHeader('x-auth-token', token);

  } else {
    return res.status(400).send("Passwords must match.");
  }

});

module.exports = router;
