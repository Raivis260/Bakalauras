const express = require('express');
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const router = express.Router();

router.post('/', async(req,res) => {

  const {error} = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if (user) return res.status(400).send('User already registered.');

  user = new User({
    email: req.body.email,
    password: req.body.password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.send(_.pick(user, ['id', 'email']));
});


module.exports = router;
