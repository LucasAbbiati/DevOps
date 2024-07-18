import React from 'react';
import Book from './Book';

const BookList = ({ books, deleteBook }) => {
  return (
    <div className="overflow-y-auto h-96 bg-white p-4 rounded shadow">
      {books.map((book) => (
        <Book key={book.id} book={book} deleteBook={deleteBook} />
      ))}
    </div>
  );
};

export default BookList;
