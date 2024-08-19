import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import axios from 'axios';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await axios.get('/api/books');
    setBooks(response.data);
  };

  const addBook = async (book) => {
    const response = await axios.post('/api/books', book);
    setBooks([...books, response.data]);
  };

  const deleteBook = async (id) => {
    await axios.delete(`/api/books/${id}`);
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Header />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Livros da Biblioteca</h2>
        <AddBook addBook={addBook} />
      </div>
      <BookList books={books} deleteBook={deleteBook} />
    </div>
  );
};

export default App;
