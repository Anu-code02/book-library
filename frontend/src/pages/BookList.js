 import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books').then(res => setBooks(res.data));
  }, []);

  const borrow = async bookId => {
    await axios.post('http://localhost:5000/api/users/borrow', { bookId }, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    window.location.reload();
  };

  return (
    <div>
      <h2>Book Catalog</h2>
      {books.map(book => (
        <div key={book._id}>
          <h3>{book.title}</h3>
          <p>{book.author} | {book.genre}</p>
          <p>Available: {book.totalCopies - book.borrowedCount}</p>
          {user && user.role === 'User' && (
            <button disabled={book.borrowedCount >= book.totalCopies} onClick={() => borrow(book._id)}>
              Borrow
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookList;



