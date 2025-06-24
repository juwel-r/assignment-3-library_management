import dotenv from "dotenv";
dotenv.config();
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;
const PORT = 5000;
const mongoDbURI:string = process.env.mongoDbURI!

async function main() {
  try {
    await mongoose.connect(mongoDbURI);
    console.log("Mongoose Connect Successfully");
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main()