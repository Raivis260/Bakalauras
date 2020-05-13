const express = require('express');
const path = require('path');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

const HomeController = require('../controllers/home');

router.get('/', HomeController.get_home_products_grid);
router.post('/', HomeController.home_search);

module.exports = router;
