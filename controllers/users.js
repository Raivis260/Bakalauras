const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const passport = require('passport');

const {
  User
} = require('../models/user');
const {
  Product
} = require('../models/product');

//User registration

exports.user_register = async (req, res) => {
  const {
    email,
    password,
    passwordConfirmitation,
    adress,
    zipcode
  } = req.body;

  let errors = [];

  if (!email || !password || !passwordConfirmitation || !adress || !zipcode) {
    errors.push({
      msg: 'Prašome užpildyti visus laukus'
    });
  }

  if (password !== passwordConfirmitation) {
    errors.push({
      msg: 'Slaptažodžiai nesutampa'
    });
  }

  if (password.length < 6) {
    errors.push({
      msg: 'Slaptažodis turėtų būti bent 6 ženklų ilgio'
    });
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
      errors.push({
        msg: 'Toks vartotojas jau egzistuoja.'
      });
      res.render('register', {
        errors,
        email,
        password,
        passwordConfirmitation,
        adress,
        zipcode
      });
    } else {
      user = new User({
        email,
        password,
        adress,
        zipcode
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
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
exports.user_logout = (req, res) => {
  req.logout();
  res.redirect('/users/login');
};


// Mėgstamiausi
exports.user_get_my_list = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.user.email
    });
    res.render('productsList', {
      user: user
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.user_delete_from_my_list = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.user.email
    });
    const product = await Product.findById(req.params.id);

    await user.updateOne({
      $pull: {
        favouriteList: {
          _id: product._id
        }
      }
    });

    await user.save();

    req.flash('success_msg', 'Produktas buvo sėkmingai pašalintas iš sąrašo');
    res.redirect('/users/my-list');

  } catch (err) {
    res.redirect('/users/my-list');
    console.log(err.message);
  }
}

// Įkelti

exports.user_get_my_products = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.user.email
    });
    let userProducts = await Product.find({
      user: user._id
    });

    res.render('myProducts', {
      user: user,
      userProducts: userProducts
    });
  } catch (err) {
    console.log(err.message);
  }
}

// Profile edit
exports.get_profile_edit = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.user.email
    });
    res.render('profileEdit', {
      user: user
    });
  } catch (err) {
    console.log(err.message);
  }
}

exports.post_profile_edit = async (req, res) => {
  try {
    let errors = [];

    let user = await User.findOne({
      email: req.user.email
    });

    if (!req.body.userEmail || !req.body.userAdress || !req.body.userZipcode) {
      errors.push({
        msg: 'Prašome užpildyti visus laukus'
      });
    }

    let searchUser = await User.findOne({
      email: req.body.userEmail
    });
    if (searchUser && req.body.userEmail !== req.user.email) {
      errors.push({
        msg: 'Toks el. paštas jau egzistuoja.'
      });
    }

    if (errors.length > 0) {
      res.render('profileEdit', {
        errors,
        user
      });
    } else {
      // Validation Passed

      let user = await User.updateOne({
        email: req.user.email
      }, {
        email: req.body.userEmail,
        adress: req.body.userAdress,
        zipcode: req.body.userZipcode
      });

      req.flash('success_msg', 'Profilis atnaujintas');
      res.redirect('/');
    }
  } catch (err) {
    console.log(err.message);
  }
}

exports.get_password_change = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.user.email
    });
    res.render('passwordChange', {
      user: user
    });
  } catch (err) {
    console.log(err.message);
  }
}

exports.post_password_change = async (req, res) => {
  try {

    let errors = [];

    if (!req.body.userPassword || !req.body.confirmPassword) {
      errors.push({
        msg: 'Prašome užpildyti visus laukus'
      });
    }
    if (req.body.userPassword !== req.body.confirmPassword) {
      errors.push({
        msg: 'Slaptažodžiai nesutampa'
      });
    }

    if (req.body.userPassword.length < 6) {
      errors.push({
        msg: 'Slaptažodis turėtų būti bent 6 ženklų ilgio'
      });
    }

    if (errors.length > 0) {
      res.render('passwordChange', {
        errors
      });
    } else {
      // Validation Passed
      const salt = await bcrypt.genSalt(10);
      let password = await bcrypt.hash(req.body.userPassword, salt);

      let user = await User.updateOne({
        email: req.user.email
      }, {
        password: password
      });

      req.flash('success_msg', 'Slaptažodis atnaujintas');
      res.redirect('/users/edit');
    }
  } catch (err) {
    console.log(err.message);
  }
}
// Laimėjimai

exports.get_user_wins = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.user.email
    });
    const products = await Product.find({
      productLeader: user._id
    });

    res.render('wins', {
      products: products
    });
  } catch (err) {
    console.log(err.message);
  }
}
