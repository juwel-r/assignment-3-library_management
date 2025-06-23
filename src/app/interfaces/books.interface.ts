import { Model } from "mongoose";

export interface Books {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface BookAvailability extends Model<Books> {
  borrowProcess(bookId: string, quantity: number): any;
}
