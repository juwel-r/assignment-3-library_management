import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
import { AnyArray } from "mongoose";

export const booksRouter = express.Router();

booksRouter.post("/", async (req: Request, res: Response) => {
  const data = req.body;
  const book = await Book.create(data);
  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
});

booksRouter.get("/", async (req: Request, res: Response) => {
  let { filter, sortBy, sort, limit } = req.query;
  const query = filter ? { genre: filter } : {};

  let books = await Book.find(query)
    .sort({
      [sortBy as string]: sort === "asc" ? "asc" : "desc",
    })
    .limit(limit ? parseInt(limit as string) : 0);
  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

booksRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  let books = await Book.findById(id);
  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

booksRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  let books = await Book.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Books updated successfully",
    data: books,
  });
});

booksRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  let books = await Book.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Books deleted successfully",
    data: null,
  });
});
