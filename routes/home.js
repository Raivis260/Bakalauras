const express = require('express');
const path = require('path');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render(path.resolve(__dirname + '/../views/home.ejs'));
})


module.exports = router;
