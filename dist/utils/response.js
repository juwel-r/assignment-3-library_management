"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (res, data) => {
    if (data) {
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: data,
        });
    }
    else {
        res.status(404).json({
            success: false,
            message: "No book found with this ID",
            data: data,
        });
    }
};
exports.response = response;
