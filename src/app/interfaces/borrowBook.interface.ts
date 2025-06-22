import { Types } from "mongoose";

export interface BorrowBook {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}
