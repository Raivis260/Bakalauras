const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/about', async (req, res) => {
  res.render('about');
})

router.get('/faq', (req, res) => {
  res.render('faq');
})

router.get('/help', (req, res) => {
  res.render('help');
})


module.exports = router;
