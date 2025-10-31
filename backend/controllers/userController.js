 const User = require('../models/User');
const Book = require('../models/Book');

exports.borrowBook = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (book.borrowedCount >= book.totalCopies) {
      return res.status(400).json({ msg: 'No copies available' });
    }

    const alreadyBorrowed = user.borrowedBooks.find(b => b.bookId.toString() === bookId);
    if (alreadyBorrowed) {
      return res.status(400).json({ msg: 'Already borrowed this book' });
    }

    user.borrowedBooks.push({ bookId, borrowDate: new Date() });
    book.borrowedCount += 1;

    await user.save();
    await book.save();

    res.json({ msg: 'Book borrowed successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.returnBook = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    user.borrowedBooks = user.borrowedBooks.filter(b => b.bookId.toString() !== bookId);
    book.borrowedCount -= 1;

    await user.save();
    await book.save();

    res.json({ msg: 'Book returned successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getBorrowedBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('borrowedBooks.bookId');
    res.json(user.borrowedBooks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};




