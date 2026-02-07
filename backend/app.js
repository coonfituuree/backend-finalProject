import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./app/config/connectdb.js";
import authRouter from "./app/routes/auth.routes.js";
import userRouter from "./app/routes/user.routes.js";
import flightRouter from "./app/routes/flight.routes.js";
import bookingRouter from "./app/routes/booking.routes.js";
import paymentRouter from "./app/routes/payment.routes.js";
import adminMiddleware from "./app/middlewares/admin.middleware.js";
import adminRouter from "./app/routes/admin.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://backend-final-project-frontend.vercel.app", // 👈 твой фронт
    credentials: true, // 👈 разрешаем cookies
  }),
);
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ success: false, message: "Invalid JSON" });
  }
  next(err);
});

app.set("trust proxy", 1);

app.get("/", (req, res) => res.send("main page"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/flights", flightRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/admin", adminRouter);


app.get("/api/test-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL, // отправь самому себе
      subject: "Test Railway Email",
      text: "If you see this, nodemailer works!"
    });
    res.json({ success: true, message: "Email sent!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
