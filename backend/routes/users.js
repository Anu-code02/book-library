const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { borrowBook, returnBook, getBorrowedBooks } = require('../controllers/userController');

router.post('/borrow', auth, borrowBook);
router.post('/return', auth, returnBook);
router.get('/borrowed', auth, getBorrowedBooks);

module.exports = router;
