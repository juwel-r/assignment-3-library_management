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
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
const zod_1 = require("zod");
exports.booksRouter = express_1.default.Router();
const bookZod = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.string(),
    isbn: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number(),
    available: zod_1.z.boolean(),
});
exports.booksRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield bookZod.parseAsync(req.body);
        const book = yield books_model_1.Book.create(data);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { filter, sortBy, sort, limit } = req.query;
    const query = filter ? { genre: filter } : {};
    let books = yield books_model_1.Book.find(query)
        .sort({
        [sortBy]: sort === "asc" ? "asc" : "desc",
    })
        .limit(limit ? parseInt(limit) : 0);
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
    });
}));
exports.booksRouter.get("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        let books = yield books_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.booksRouter.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const updateData = req.body;
    let books = yield books_model_1.Book.findByIdAndUpdate(bookId, updateData, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        success: true,
        message: "Books updated successfully",
        data: books,
    });
}));
exports.booksRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    yield books_model_1.Book.findByIdAndDelete(bookId);
    res.status(200).json({
        success: true,
        message: "Books deleted successfully",
        data: null,
    });
}));
