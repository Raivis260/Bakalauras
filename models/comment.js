const mongoose = require('mongoose');
const {User} = require('../models/user');

const commentSchema = new mongoose.Schema({
  message: {
    type: String,
    minlength: 1,
    maxlength: 300
  },
  created: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Comment = mongoose.model("Comment", commentSchema);

exports.Comment = Comment;
