const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UsersController = require('../controllers/users');

// Login Page
router.get('/login', (req, res) => {
  res.render('login');
})
// Register Page
router.get('/register', (req, res) => {
  res.render('register');
})

// Register handle
router.post('/register', UsersController.user_register);

//Login handle
router.post('/login', UsersController.user_login);

//Logout handle
router.get('/logout', UsersController.user_logout);

module.exports = router;
