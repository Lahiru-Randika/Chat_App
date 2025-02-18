import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import messageRoutes from "./routes/messageRoutes.js";
import connectToMongoDB from "./DB/connectMongoDB.js";
import path from "path"

import { app, server } from "./socket/socket.js";
// const app = express(); => this is moved to the socket.js and we will call the app from that server file

//to use the .env file
dotenv.config();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

//to parse the incomming request with json payloads from req.body
app.use(express.json());

//to access the stored cookies we need this. Also before routes calls
app.use(cookieParser());

// Enable CORS for all origins (we can customize this as needed)
app.use(cors());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})
//server is comming from the socket.js
server.listen( PORT, ()=>{
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
})