import express, { NextFunction, Request, Response } from "express";
import { booksRouter } from "./app/controllers/books.controller";
import { borrowBook } from "./app/controllers/borrowBook.controller";
import { error } from "console";
const app = express();
app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowBook);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Library management Server Running!");
  } catch (error) {
    next(error);
  }
});

//Need to implement error Handler
app.use((req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route not found!",
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
});

export default app;

//https://github.com/Apollo-Level2-Web-Dev/B5A3
// mongodb+srv://<db_username>:<db_password>@cluster0.hjkzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
