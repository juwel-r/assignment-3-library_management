import express, { Request, Response } from "express";
import { booksRouter } from "./app/controllers/books.controller";
const app = express();
app.use(express.json());

app.use("/books", booksRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Library management Server Running!");
});

//Need to implement error Handler
// app.use((err, req:Request, res:Response, next)=>{})

export default app;

//https://github.com/Apollo-Level2-Web-Dev/B5A3