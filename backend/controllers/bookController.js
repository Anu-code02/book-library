const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  const { title, author, genre, totalCopies } = req.body;
  try {
    const book = new Book({ title, author, genre, totalCopies });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
