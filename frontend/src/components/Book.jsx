import React from 'react';

const Book = ({ book, deleteBook }) => {
  return (
    <div className="flex justify-between items-center bg-gray-200 p-4 mb-2 rounded">
      <div>
        <h3 className="text-lg font-bold">{book.title}</h3>
        <p className="text-sm">{book.author}</p>
        <p className="text-xs">{book.description}</p>
      </div>
      <button
        className="bg-red-500 text-white p-2 rounded"
        onClick={() => deleteBook(book.id)}
      >
        🗑️
      </button>
    </div>
  );
};

export default Book;
