"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBook = void 0;
const express_1 = __importDefault(require("express"));
const borrowBooks_model_1 = require("../models/borrowBooks.model");
const books_model_1 = require("../models/books.model");
const zod_1 = require("zod");
exports.borrowBook = express_1.default.Router();
const borrowZod = zod_1.z.object({
    book: zod_1.z.string(),
    quantity: zod_1.z.number(),
    dueDate: zod_1.z.date().optional(),
});
exports.borrowBook.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { book: bookId, quantity } = req.body;
    const borrowBook = yield books_model_1.Book.borrowProcess(bookId, quantity);
    if (borrowBook) {
        const borrowInfo = yield borrowBooks_model_1.BorrowBook.create(data);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowInfo,
        });
    }
    else {
        res.status(403).json({
            success: false,
            message: "Book is not available or please provide correct book id or quantity",
        });
    }
}));
exports.borrowBook.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield borrowBooks_model_1.BorrowBook.aggregate([
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
}));
