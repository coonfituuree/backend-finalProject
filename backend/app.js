import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./app/config/connectdb.js";
import authRouter from "./app/routes/auth.routes.js";
import userRouter from "./app/routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true })); // Enable CORS for all routes

// endpoints
app.get("/", (req, res) => res.send("main page"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter)

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
