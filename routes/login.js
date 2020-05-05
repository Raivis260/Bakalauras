const config = require('config');
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const Joi = require('joi');
const passport = require('passport');
const router = express.Router();


router.get('/', (req, res) => {
  res.render(path.resolve(__dirname + '/../views/login.ejs'));
})

router.post('/', function (req,res,next) {

  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
    //failureFlash: true
  }) (req, res, next);

/*  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid email or password.');
  }

  const token = user.generateAuthToken();
  res.send(token); */
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login')
});

function validate(req) {

  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(1024).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
