import express, { NextFunction, Request, Response } from "express";
import { BorrowBook } from "../models/borrowBooks.model";
import { Book } from "../models/books.model";
import { borrowZod } from "../../utils/zodValidation";
export const borrowBook = express.Router();

borrowBook.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await borrowZod.parseAsync(req.body);
      const { book: bookId, quantity } = req.body;
      const borrowBook = await Book.borrowProcess(bookId, quantity);
      if (borrowBook) {
        const borrowInfo = await BorrowBook.create(data);
        res.status(201).json({
          success: true,
          message: "Book borrowed successfully",
          data: borrowInfo,
        });
      } else {
        res.status(403).json({
          success: false,
          message:
            "Book is not available or please provide correct book id or quantity",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

borrowBook.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await BorrowBook.aggregate([
      {
        $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "data",
        },
      },
      {
        $unwind: "$data",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$data.title",
            isbn: "$data.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
});
