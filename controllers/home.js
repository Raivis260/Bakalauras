const express = require('express');
const path = require('path');
const {Product} = require('../models/product');


exports.get_home_products_grid = async (req, res) => {
  let queryParameter = req.query;
  let products = await getProducts(queryParameter);
  res.render('home', {items: products});
};


async function getProducts(query) {

  let products;
  products = await Product.find(query);
  return products;
}
