import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/books.model";
import { bookZod } from "../../utils/zodValidation";

export const booksRouter = express.Router();

booksRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await bookZod.parseAsync(req.body);
      const book = await Book.create(data);
      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

booksRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
      next(error);
    }
  }
);

booksRouter.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params;
      let books = await Book.findById(bookId);

      res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  }
);

booksRouter.put(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params;
      const updateData = req.body;
      let books = await Book.findByIdAndUpdate(bookId, updateData, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        message: "Books updated successfully",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  }
);

booksRouter.delete(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params;
      await Book.findByIdAndDelete(bookId);
      res.status(200).json({
        success: true,
        message: "Books deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
);
