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
    enum: ['Menas', 'Knygos', 'Automobiliai/motociklai', 'Monetos', 'Kompiuteriai/žaidimai', 'Brangakmeniai', 'Mada', 'Dekoracijos', 'Papuošalai', 'Sportas', 'Žaislai', 'Ginklai']
  },
  city: {
    type: String,
    minlength: 4,
    maxlength: 55,
    required: true
  },
  condition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Condition'
  },
  description: {
    type: String,
    maxlength: 299
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
  },
  productLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: Boolean,
    default: true
  }
});

const Product = mongoose.model('Product', productSchema);



exports.Product = Product;
