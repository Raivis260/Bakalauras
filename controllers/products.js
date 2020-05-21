const express = require('express');
const sharp = require('sharp');
const {
  Product
} = require('../models/product');
const multer = require('multer');
const {
  User
} = require('../models/user');
const {
  Comment
} = require('../models/comment');

const FilterController = require("./filters");

// Open product form
exports.products_get = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id)
    if(!req.user) {
      let user = {
        isAdmin: false
      };
        res.render('product', {user: user, product: product});
    }
    else {
      let user = await User.findOne({email: req.user.email});
      res.render('product', {user: user, product: product});
    }
  }
    catch (err) {
    console.log(err.message);
  }
};

exports.products_post_price = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    let price = req.body.priceInput;
    let user = await User.findOne({email: req.user.email});
    if (price <= product.price || price >= 9999999.99) {
      req.flash('error_msg', 'Prašome įvesti didesnę kainą nei dabartinė.');
      await res.redirect(`/products/${product._id}`);
    } else {
      product.price = price;
      product.productLeader = user;
      await product.save();
      req.flash('success_msg', 'Jūsų kaina sėkmingai pasiūlyta! Jūs esate aukciono lyderis!');
      await res.redirect(`/products/${product._id}`);
    }
  } catch (err) {
    console.log(err.message);
  }

}

//TODO
exports.products_post_quick_bid_first = async (req, res) => {
  try {
    let user = await User.findOne({email: req.user.email});
    let product = await Product.findOne({_id: req.params.id});
    await Product.updateOne({_id: req.params.id}, {$set: {
      price: req.body.Btn1Price,
      productLeader: user
    }});
    req.flash('success_msg', 'Jūsų kaina sėkmingai pasiūlyta! Jūs esate aukciono lyderis!');
    await res.redirect(`/products/${product._id}`);
  }

  catch (err) {
    console.log(err.message);
  }
}
exports.products_post_quick_bid_second = async (req, res) => {
  try {
    let user = await User.findOne({email: req.user.email});
    let product = await Product.findOne({_id: req.params.id});
    await Product.updateOne({_id: req.params.id}, {$set: {
      price: req.body.Btn2Price,
      productLeader: user
    }});
    req.flash('success_msg', 'Jūsų kaina sėkmingai pasiūlyta! Jūs esate aukciono lyderis!');
    await res.redirect(`/products/${product._id}`);
  }

  catch (err) {
    console.log(err.message);
  }
}
exports.products_post_quick_bid_third = async (req, res) => {
  try {
    let user = await User.findOne({email: req.user.email});
    let product = await Product.findOne({_id: req.params.id});
    await Product.updateOne({_id: req.params.id}, {$set: {
      price: req.body.Btn3Price,
      productLeader: user
    }});
    req.flash('success_msg', 'Jūsų kaina sėkmingai pasiūlyta! Jūs esate aukciono lyderis!');
    await res.redirect(`/products/${product._id}`);
  }

  catch (err) {
    console.log(err.message);
  }
}

//Products list.
exports.products_add_to_list = async (req, res) => {

  let existance = false;
  try {

    const user = await User.findOne({
      email: req.user.email
    });
    const product = await Product.findById(req.params.id);

    if (user.favouriteList.length > 0) {
      user.favouriteList.forEach(element => {
        if (element._id.equals(product._id)) {
          existance = true;
        }
      });

      if (existance) {
        req.flash('error_msg', 'Šis produktas jau yra jūsų mėgstamų sąraše.');
        res.redirect(`/products/${product._id}`);
      } else {
        user.favouriteList.push(product);
        await user.save();
        req.flash('success_msg', 'Produktas pridėtas prie mėgstamų sąrašo.');
        await res.redirect(`/products/${product._id}`);
      }
    } else {
      user.favouriteList.push(product);
      await user.save();
      req.flash('success_msg', 'Produktas pridėtas prie mėgstamų sąrašo.');
      await res.redirect(`/products/${product._id}`);
    }

  } catch (err) {
    console.log(err.message);
  }
}


exports.products_post_comment = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.user.email
    });

    let product = await Product.findById(req.params.id);
    if(req.body.commentText == "") {
      res.render('product', {
        user: user,
        product: product
      });
    }
    else {
      let comment = new Comment({
        message: req.body.commentText,
        user: user
      });

      product.comments.push(comment);

      await product.save();
      res.render('product', {
        user: user,
        product: product
      });
    }
  }
    catch (err) {
      res.redirect('/products/:id')
      console.log(err);
      req.flash('error_msg', 'Kažkas ne taip.')
    }
}


// To add product
exports.products_get_add_form = async (req, res) => {

  let cities = await FilterController.get_cities();
  let categories = await FilterController.get_categories();
  let conditions = await FilterController.get_condition();

  res.render('productAdd', {cities: cities, categories: categories, conditions:conditions});
};

exports.products_post_product = async (req, res, next) => {

  let width = 400;
  let height = 300;

  let images = [];

  for(let i=0; i< req.files.length; i++) {

     sharp(req.files[i].path)
       .resize(width, height)
       .png()
       .toFile('uploads/changed_' + req.files[i].originalname,  function(err) {
         if(!err) {
           console.log('SHARP worked!');
           console.log(`uploads/changed_${req.files[i].originalname}`);
         }
         else {
           console.log(err);
         }
       })
    await images.push(`uploads/changed_${req.files[i].originalname}`);
  }

  const user = await User.findOne({email: req.user.email});

  const product = new Product({
    name: req.body.inputProductName,
    city: req.body.citySelect,
    category: req.body.categorySelect,
    condition: req.body.conditionSelect,
    description: req.body.productDescription,
    price: req.body.inputProductPrice,
    image: images,
    endTime: '2020-05-20',
    timeLeft: '2020-06-20',
    user: user
  });


  await product.save();
  req.flash('success_msg', 'Produktas pridėtas prie aktyvių aukcionų!');
  res.redirect('/');

}

exports.get_product_edit = async(req, res) => {

  const product = await Product.findOne({_id: req.params.id});
  let cities = await FilterController.get_cities();
  let categories = await FilterController.get_categories();
  let conditions = await FilterController.get_condition();
  res.render('productEdit', {product: product, cities: cities, categories: categories, conditions: conditions});
}

exports.post_product_edit = async(req, res) => {

  try {

    let {name, city, category, condition, description, price} = req.body;

    const product = await Product.updateOne({_id: req.params.id}, {$set: {
      name: req.body.inputProductName,
      city: req.body.citySelect,
      category: req.body.categorySelect,
      condition: req.body.conditionSelect,
      description: req.body.productDescription,
      price: req.body.inputProductPrice
    }});
    await req.flash('success_msg', 'Produktas sėkmingai redaguotas.');
    await res.redirect('/users/my-items');
  }

  catch(err) {
    console.log(err.message);
  }

}

exports.delete_from_my_items = async(req, res) => {

  try {
    const product = await Product.findById(req.params.id);
    await Product.deleteOne(product);
  }
  catch(err) {
    console.log(err.message);
  }
  req.flash('success_msg', 'Product successfully deleted from list.');
  res.redirect('/users/my-items');
}
