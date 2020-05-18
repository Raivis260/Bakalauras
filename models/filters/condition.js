const mongoose = require('mongoose');

const conditionSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['New', 'Used', 'Damaged'],
    default: 'Used'
  }
});


const Condition = mongoose.model('Condition', conditionSchema);

exports.Condition = Condition;
