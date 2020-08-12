const express = require('express');
const path = require('path');
const {Product} = require('../models/product');
const {City} = require('../models/filters/city');
const {Category} = require('../models/filters/category');
const {Condition} = require('../models/filters/condition');



exports.get_cities = async(req, res) => {

  let cities = [];
  cities = await City
    .find({})
    .sort({city: 1})
    .select({city: 1, _id: 1});

  return cities;
}

exports.get_categories = async(req, res) => {

  let categories = await Category
    .find({})
    .sort({name: 1})
    .select({name: 1, _id: 1});

  return categories;
}

exports.get_condition = async(req, res) => {

  let conditions = await Condition
    .find({})
    .sort({name: 1})
    .select({name:1, _id: 1});

  return conditions;

}
