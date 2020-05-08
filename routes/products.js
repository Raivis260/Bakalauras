const express = require('express');
const path = require('path');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const {Product} = require('../models/product');

const ProductsController = require('../controllers/products');

router.get('/:id', ProductsController.products_get);

router.get('/add/add-product', ensureAuthenticated, ProductsController.products_get_add_form);
router.post('/add/add-product', ensureAuthenticated, ProductsController.products_post_product);

function countdown(req) {

  let now = new Date();
  let eventDate = new Date(2016, 11, 25);

  let currentTime = now.getTime();
  let eventTime = eventDate.getTime();

  let remTime = eventTime - currentTime;

  let s = Math.floor(remTime / 1000);
  let m = Math.floor(s / 60);
  let h = Math.floor(m / 60);
  let d = Math.floor(h / 24);

  h %= 24;
  m %= 60;
  s %= 60;

  if (h < 10) {
    h = "0" + h;
  }

  if (m < 10) {
    m = "0" + m;
  }

  if (s<10) {
    s = "0" + s;
  }

  setTimeout(countdown, 1000);

}


module.exports = router;
