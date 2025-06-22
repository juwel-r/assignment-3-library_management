import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;
const PORT = 5000;

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/library-management");
    console.log("Mongoose Connect Successfully");
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (error) {}
}

main()
