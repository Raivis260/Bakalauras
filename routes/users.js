const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../config/auth');

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


// My List
router.get ('/my-list', ensureAuthenticated, UsersController.user_get_my_list);
router.post('/my-list/:id', ensureAuthenticated, UsersController.user_delete_from_my_list);

// My Procuts
router.get('/my-items', ensureAuthenticated, UsersController.user_get_my_products);


//Profile edit

router.get('/edit', ensureAuthenticated, UsersController.get_profile_edit);
router.get('/edit/pswChange', ensureAuthenticated, UsersController.get_password_change);

router.post('/edit/pswChange', ensureAuthenticated, UsersController.post_password_change);
module.exports = router;
