from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000",  # URL do frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = "data.json"


class Book(BaseModel):
    id: int
    title: str
    author: str
    description: Optional[str] = None


def read_data():
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w') as f:
            json.dump([], f)
    with open(DATA_FILE, 'r') as f:
        return json.load(f)


def write_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Library API"}


@app.get("/books", response_model=List[Book])
def get_books():
    return read_data()


@app.post("/books", response_model=Book)
def add_book(book: Book):
    books = read_data()
    if any(b['id'] == book.id for b in books):
        raise HTTPException(status_code=400, detail="Book ID already exists")
    books.append(book.dict())
    write_data(books)
    return book


@app.delete("/books/{book_id}", response_model=Book)
def delete_book(book_id: int):
    books = read_data()
    book = next((b for b in books if b['id'] == book_id), None)
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    books.remove(book)
    write_data(books)
    return book


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
