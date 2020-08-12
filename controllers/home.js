const express = require('express');
const path = require('path');
const {Product} = require('../models/product');
const {Category} = require('../models/filters/category');
const {User} = require('../models/user');
const FilterController = require("./filters");


exports.get_home_products_grid = async (req, res) => {

    try {
      let queryParameter = req.query;
      let products = await getProductStatusTrue(queryParameter);
      let cities = await FilterController.get_cities();
      let categories = await FilterController.get_categories();
      let conditions = await FilterController.get_condition();

      let now = new Date().getTime();
      let deadline = new Date("2020-10-20 8:59:30").getTime();

      var t = deadline - now;

       if (t > 0 && t < 1000 || t < 0) {
         products = await Product.updateMany({status: true}, {$set: {status: false}});
       }
       else {
        products = await getProductStatusTrue(queryParameter);
       }

      if(!req.user) {
        let user = {
          isAdmin: false
        };
          res.render('home', {user: user, products: products, cities: cities, categories: categories, conditions: conditions});
      }
      else {
        let user = await User.findOne({email: req.user.email});
        res.render('home', {user: user, products: products, cities: cities, categories: categories, conditions: conditions});
      }
    }
    catch(err) {
      console.log(err.message);
    }

};

//Admin action

exports.admin_product_remove = async(req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    req.flash('success_msg', 'Produktas sėkmingai pašalintas iš aukciono');
    res.redirect('/');
  }
  catch (err) {
    console.log(err.message);
  }
}

async function getProductStatusTrue(query) {
  let products;
  query.status = true;
  products = await Product.find(query);
  return products;
}

async function getProducts(query) {

  let products;
  products = await Product.find(query);
  return products;
}
