const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const passport = require('passport');

const {User} = require('../models/user');
const {Product} = require('../models/product');

//User registration

exports.user_register = async (req, res) => {
  const { email, password, passwordConfirmitation, adress, zipcode } = req.body;

  let errors = [];

  if (!email || !password || !passwordConfirmitation || !adress || !zipcode) {
    errors.push({msg: 'Prašome užpildyti visus laukus'});
  }

  if (password !== passwordConfirmitation) {
    errors.push({msg: 'Slaptažodžiai nesutampa'});
  }

  if (password.length < 6) {
    errors.push({msg: 'Slaptažodis turėtų būti bent 6 ženklų ilgio'});
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
      errors.push({msg: 'Toks vartotojas jau egzistuoja.'});
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
      req.flash('success_msg', 'Jūs sėkmingai prisiregistravote ir galite prisijungti!');
      res.redirect('/users/login');
    }
  }
};
// User Login
exports.user_login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
    failureFlash: 'Neteisingi prisijungimo duomenys'
  })(req, res, next);
};

// User Logout
exports.user_logout = (req,res) => {
  req.logout();
  req.flash('success_msg', 'Jūs sėkmingai atsijungėte.');
  res.redirect('/users/login');
};

exports.user_get_my_list = async (req, res) => {
  try {
    const user = await User.findOne({email: req.user.email});
    res.render('productsList', {user: user});
  }
  catch(err) {
    console.log(err.message);
  }
};

exports.user_delete_from_my_list = async (req, res) => {
  try {
    const user = await User.findOne({email: req.user.email});
    const product = await Product.findById(req.params.id);

    user.update({favouriteList: {$pull: {_id: product._id} }});

    await user.save();

    req.flash('success_msg', 'Produktas buvo sėkmingai pašalintas iš sąrašo');
    res.redirect('/users/my-list');
  }
  catch (err) {
    console.log(err.message);
  }
}

const array = [2, 5, 9];

console.log(array);

const index = array.indexOf(5);
if (index > -1) {
  array.splice(index, 1);
}

// array = [2, 9]
console.log(array);
