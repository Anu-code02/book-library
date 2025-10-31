const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  totalCopies: Number,
  borrowedCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Book', bookSchema);
