const express = require('express');
const path = require('path');
const {Product} = require('../models/product');


exports.get_home_products_grid = async (req, res) => {

  let queryParameter;
  queryParameter = req.query;
  let products = await getProducts(queryParameter);
  res.render('home', {products: products});
};

exports.home_search = async (req, res) => {
  const { term } = req.query;

  let products = [];
  products = await Product.find({name: term});
  res.render('home', {products: products});
}

async function getProducts(query) {

  let products;
  products = await Product.find(query);
  return products;
}
