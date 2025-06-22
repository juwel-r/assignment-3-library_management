import express, { Request, Response } from "express";
import { booksRouter } from "./app/controllers/books.controller";
import { borrowBook } from "./app/controllers/borrowBook.controller";
const app = express();
app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowBook)

app.get("/", (req: Request, res: Response) => {
  res.send("Library management Server Running!");
});
  
//Need to implement error Handler
// app.use((err, req:Request, res:Response, next)=>{})

export default app;

//https://github.com/Apollo-Level2-Web-Dev/B5A3
// mongodb+srv://<db_username>:<db_password>@cluster0.hjkzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0