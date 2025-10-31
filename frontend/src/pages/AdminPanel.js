import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', genre: '', totalCopies: 1 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/books').then(res => setBooks(res.data));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const addBook = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/books', form, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    window.location.reload();
  };

  const deleteBook = async id => {
    await axios.delete(`http://localhost:5000/api/books/${id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    window.location.reload();
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={addBook}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="author" placeholder="Author" onChange={handleChange} required />
        <input name="genre" placeholder="Genre" onChange={handleChange} required />
        <input name="totalCopies" type="number" min="1" onChange={handleChange} required />
        <button type="submit">Add Book</button>
      </form>

      <h3>All Books</h3>
      {books.map(book => (
        <div key={book._id}>
          <strong>{book.title}</strong> by {book.author} ({book.genre})<br />
          Copies: {book.totalCopies} | Borrowed: {book.borrowedCount}
          <button onClick={() => deleteBook(book._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;

        