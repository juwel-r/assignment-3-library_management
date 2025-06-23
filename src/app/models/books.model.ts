import { model, Schema } from "mongoose";
import { BookAvailability, Books } from "../interfaces/books.interface";

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
    isbn: {
      type: String,
      required: true,
      unique: [true, "Duplicate isbn not allow."],
    },
    description: {
      type: String,
      max: 200,
    },
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

bookSchema.static(
  "borrowProcess",
  async function async(bookId: string, quantity: number) {
    if (!Number.isInteger(quantity)) {
      return null;
    }
    const book = await this.findById(bookId);
    if (!book) return null;

    if (book.copies > 0 && book.copies >= quantity) {
      let updateData: any = {};
      updateData.copies = book.copies - quantity;
      if (book.copies - quantity === 0) {
        updateData.available = false;
      }
      await Book.findByIdAndUpdate(bookId, updateData);
      return book;
    }
  }
);

export const Book = model<Books, BookAvailability>("Books", bookSchema);
