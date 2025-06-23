require("dotenv").config();
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;
const PORT = 5000;
const userId= process.env.userId
const password= process.env.password

async function main() {
  try {
    await mongoose.connect(`mongodb+srv://${userId}:${password}@cluster0.hjkzu.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0`);
    console.log("Mongoose Connect Successfully");
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main()