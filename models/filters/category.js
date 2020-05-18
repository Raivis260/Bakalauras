const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema);

exports.Category = Category;
