const express = require('express');
const {Product} = require('../models/product');
const multer = require('multer');
const {User} = require('../models/user');
const {Comment} = require('../models/comment');
// Open product form
exports.products_get = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id)

    let comments = product.comments;
    res.render('product', {product: product});

  }
  catch(err) {
    console.log(err.message);
  }
};

exports.products_post_price = async(req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    let price = req.body.priceInput;

    if (price <= product.price || price >= 9999999.99)
    {
      req.flash('error_msg', 'Prašome įvesti didesnę kainą nei dabartinė.');
      await res.redirect(`/products/${product._id}`);
    }
    else {
      product.price = price;
      await product.save();
      req.flash('success_msg', 'Jūsų kaina sėkmingai pasiūlyta! Jūs esate aukciono lyderis!');
      await res.redirect(`/products/${product._id}`);
    }
  }
  catch(err) {
    console.log(err.message);
  }

}

//TODO
exports.products_post_quick_bid = async(req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    let price = this.value;

    product.price = price;
    await product.save();
    req.flash('success_msg', 'Jūsų kaina sėkmingai pasiūlyta! Jūs esate aukciono lyderis!');
    await res.redirect(`/products/${product._id}`);
  }
  catch(err) {
    console.log(err.message);
  }
}

//Products list.
exports.products_add_to_list = async(req, res) => {
  try {

    const user = await User.findOne({email: req.user.email});
    const product = await Product.findById(req.params.id);

    user.favouriteList.forEach(element => {
      if(element._id = product._id) {
        req.flash('error_msg', 'Šis produktas jau yra jūsų mėgstamų sąraše.');
        res.redirect(`/products/${product._id}`);
        return;
      }
    });

    user.favouriteList.push(product);
    await user.save();
    req.flash('success_msg', 'Produktas pridėtas prie mėgstamų sąrašo.');
    await res.redirect(`/products/${product._id}`);
  }
  catch(err) {
    console.log(err.message);
  }
}


exports.products_post_comment = async (req, res) => {
  try {
    const user = await User.findOne({email: req.user.email});
    let product = await Product.findById(req.params.id);

    let comment = new Comment({
      message: req.body.commentText,
      user: user
    });

    product.comments.push(comment);

    await product.save();
    res.render('product', {product: product});
  }
  catch(err) {
    res.redirect('/products/:id')
    console.log(err);
    req.flash('error_msg', 'Kažkas ne taip.')
  }
}



// To add product
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
    image: req.file.path,
    endTime: '2020-05-20',
    timeLeft: '2020-06-20'
  });

  await product.save();
  req.flash('success_msg', 'Produktas pridėtas prie aktyvių aukcionų!');
  res.redirect('/');

}

function countdown(startDate, endDate) {


  let remTime = endDate- startDate;

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

  return remTime;
}
