"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrowBook_controller_1 = require("./app/controllers/borrowBook.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", books_controller_1.booksRouter);
app.use("/api/borrow", borrowBook_controller_1.borrowBook);
app.get("/", (req, res, next) => {
    try {
        res.send("Library management Server Running!");
    }
    catch (error) {
        next(error);
    }
});
//Need to implement error Handler
app.use((req, res) => {
    res.status(400).json({
        success: false,
        message: "Route not found!",
    });
});
app.use((error, req, res, next) => {
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
exports.default = app;
//https://github.com/Apollo-Level2-Web-Dev/B5A3
// mongodb+srv://<db_username>:<db_password>@cluster0.hjkzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
