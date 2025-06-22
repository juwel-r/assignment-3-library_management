import express, { Request, Response } from "express";
import { BorrowBook } from "../models/borrowBooks.model";
export const borrowBook = express.Router();

borrowBook.post("/", async (req: Request, res: Response) => {
  const data = req.body;
  const borrowData = await BorrowBook.create(data);
  res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    data: borrowData,
  });
});
