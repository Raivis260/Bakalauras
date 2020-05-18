const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  city: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true
  },
  admin: String,
  country: String,
  population_proper: String,
  iso2: String,
  capital: String,
  lat: String,
  lng: String,
  population: String,

}, {collection: 'cities'});

const City = mongoose.model('City', citySchema);

exports.City = City;
