import { model, Schema } from "mongoose";
import { BorrowBook as BorrowBookTS } from "../interfaces/borrowBook.interface";

const borrowBookSchema = new Schema<BorrowBookTS>(
  {
    book: { type: Schema.Types.ObjectId, required: true, ref: "Books" },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, default: new Date() },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


export const BorrowBook = model("BorrowBook", borrowBookSchema);
