const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  adress: {
    type: String,
    minlength: 5,
    maxlength: 1024
  },
  // TODO: Needs validation
  zipcode: {
    type: String,
    minlength: 1,
    maxlength: 10
  },
  favouriteList: {
    type: Array,
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
  });

userSchema.methods.generateAuthToken = function() {

  const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
  return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {

  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(1024).required(),
    adress: Joi.string().min(5).max(1024),
    zipcode: Joi.string().min(1).max(10)
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
