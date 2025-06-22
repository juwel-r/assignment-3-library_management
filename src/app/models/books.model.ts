import { model, Schema } from "mongoose";
import { Books } from "../interfaces/books.interface";

const bookSchema = new Schema<Books>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: { type: String, required: true, unique: true },
    description: String,
    copies: {
      type: Number,
      required: true,
      min: [1, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Book = model("Books", bookSchema);

/*
    [
  {
    "title": "The Invisible Man",
    "author": "H.G. Wells",
    "genre": "FICTION",
    "isbn": "9780141439983",
    "description": "A classic science fiction novel about a man who becomes invisible.",
    "copies": 5,
    "available": true
  },
  {
    "title": "A Brief History of Time",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "Explains cosmology for general readers, including the Big Bang and black holes.",
    "copies": 3,
    "available": true
  },
  {
    "title": "Steve Jobs",
    "author": "Walter Isaacson",
    "genre": "BIOGRAPHY",
    "isbn": "9781451648539",
    "description": "Biography of Apple co-founder Steve Jobs based on interviews and extensive research.",
    "copies": 7,
    "available": false
  },
  {
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "FANTASY",
    "isbn": "9780547928227",
    "description": "A fantasy adventure following Bilbo Baggins' journey to the Lonely Mountain.",
    "copies": 10,
    "available": true
  },
  {
    "title": "Sapiens: A Brief History of Humankind",
    "author": "Yuval Noah Harari",
    "genre": "HISTORY",
    "isbn": "9780062316097",
    "description": "An exploration of human history, from the Stone Age to the modern era.",
    "copies": 6,
    "available": true
  }
]
*/
