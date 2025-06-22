import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;
const PORT = 5000;

async function main() {
  try {
    await mongoose.connect("mongodb+srv://level2_practice:level2_practice@cluster0.hjkzu.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Mongoose Connect Successfully");
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main()
