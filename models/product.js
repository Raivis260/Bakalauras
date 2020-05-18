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
    enum: ['Menas', 'Kyngos', 'Automobiliai/motociklai', 'Monetos', 'Kompiuteriai/žaidimai', 'Brangakmeniai', 'Mada', 'Dekoracijos', 'Papuošalai', 'Sportas', 'Žaislai', 'Ginklai']
  },
  city: {
    type: String,
    minlength: 4,
    maxlength: 55,
    required: true
  },
  condition: {
    type: String,
    enum: ['Nauja', 'Naudota', 'Pažeista'],
    default: 'Naudota',
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
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Product = mongoose.model('Product', productSchema);



exports.Product = Product;
