import { useEffect, useState } from 'react';
import axios from 'axios';

const BorrowedBooks = () => {
  const [borrowed, setBorrowed] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/borrowed', {
      headers: { Authorization: localStorage.getItem('token') }
    }).then(res => setBorrowed(res.data));
  }, []);

  const returnBook = async bookId => {
    await axios.post('http://localhost:5000/api/users/return', { bookId }, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    window.location.reload();
  };

  return (
    <div>
      <h2>My Borrowed Books</h2>
      {borrowed.map(b => (
        <div key={b.bookId._id}>
          <h3>{b.bookId.title}</h3>
          <p>Borrowed on: {new Date(b.borrowDate).toLocaleDateString()}</p>
          <button onClick={() => returnBook(b.bookId._id)}>Return</button>
        </div>
      ))}
    </div>
  );
};

export default BorrowedBooks;
