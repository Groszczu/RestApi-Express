const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    default: 'no description provided'
  },
  authorName: {
    type: String,
    required: true,
    default: 'anonymous'
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
