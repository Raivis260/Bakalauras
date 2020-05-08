const express = require('express');
const {Product} = require('../models/product');

exports.products_get = async (req, res) => {

  try {
    let product = await Product.findById(req.params.id);
    res.render('product', {product: product});

  }
  catch(err) {
    console.log(err.message);
  }
};

exports.products_get_add_form = async (req, res) => {
  res.render('productAdd');
};

exports.products_post_product = async (req, res, next) => {

  const product = new Product({
    name: req.body.inputProductName,
    city: req.body.citySelect,
    category: req.body.categorySelect,
    condition: req.body.conditionSelect,
    description: req.body.productDescription,
    price: req.body.inputProductPrice,
    image: req.body.customFile,
    endTime: '2020-05-30'
  });

  await product.save();
  req.flash('success_msg', 'Product added to auction!');
  res.redirect('/');

}
