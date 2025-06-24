"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowZod = exports.bookZod = void 0;
const zod_1 = require("zod");
exports.bookZod = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.string(),
    isbn: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number(),
    available: zod_1.z.boolean(),
});
exports.borrowZod = zod_1.z.object({
    book: zod_1.z.string(),
    quantity: zod_1.z.number(),
    dueDate: zod_1.z.date().optional(),
});
