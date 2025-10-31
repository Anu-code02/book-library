const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addBook, updateBook, deleteBook, getBooks } = require('../controllers/bookController');

router.post('/', auth, addBook);
router.put('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);
router.get('/', getBooks);

module.exports = router;

