"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowBook = void 0;
const mongoose_1 = require("mongoose");
const borrowBookSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Books" },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: String, default: new Date().toISOString() },
}, {
    versionKey: false,
    timestamps: true,
});
exports.BorrowBook = (0, mongoose_1.model)("BorrowBook", borrowBookSchema);
