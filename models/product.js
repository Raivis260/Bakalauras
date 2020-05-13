const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    lowercase: true,
    minlength: 3,
    maxlength: 55,
    required: true
  },
  price: {
    type: Number,
    min: 0.00,
    max: 9999999.99,
    required: true
  },
  category: {
    type: String,
    enum: ['Art', 'Books', 'Cars/Motorcycles', 'Coins', 'Computers/Games', 'Gemstones', 'Fashion', 'Decorations', 'Jewellery', 'Sports', 'Toys', 'Weapony']
  },
  city: {
    type: String,
    minlength: 4,
    maxlength: 55,
    required: true
  },
  condition: {
    type: String,
    enum: ['New', 'Used', 'Damaged'],
    default: 'Used',
    required: true
  },
  description: {
    type: String,
    maxlength: 299
  },
  favourite: {
    type: Boolean,
    default: false
  },
  startTime: {
    type: Date,
    default: Date.now,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  image: {
    type: Array,
    default: []
  },
  comments: {
    type: Array,
    default: []
  },
  timeLeft: {
    type: Date
  }
});

const Product = mongoose.model('Product', productSchema);



exports.Product = Product;
