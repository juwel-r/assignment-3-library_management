import { Response } from "express";

export const response = (res:Response, data: any) => { 
  if (data) {
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: data,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No book found with this ID",
      data: data,
    });
  }
};
