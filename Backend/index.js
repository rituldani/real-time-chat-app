import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/messsage.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";

// const app = express()
dotenv.config()

// middleware
app.use(express.json());
// app.use(cors());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // your React frontend URL
  credentials: true // allow cookies to be sent
}));


const PORT = process.env.PORT || 30001
const URL = process.env.MONGODB_URL;

try {
  mongoose.connect(URL)
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}
app.use("/user", userRoute)
app.use("/message", messageRoute)


server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})  