const express = require('express');
const path = require('path');
const {Product} = require('../models/product');
const {Category} = require('../models/filters/category');
const {User} = require('../models/user');
const FilterController = require("./filters");

exports.get_home_products_grid = async (req, res) => {

  let queryParameter = req.query;

  let products = await getProducts(queryParameter);
  let cities = await FilterController.get_cities();
  let categories = await FilterController.get_categories();
  let conditions = await FilterController.get_condition();

  res.render('home', {products: products, cities: cities, categories: categories, conditions: conditions});
};

async function getProducts(query) {

  let products;
  products = await Product.find(query);
  return products;
}
