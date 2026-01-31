import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { createBookingSchema } from "../validations/booking.validation.js";
import { createBooking, myBookings, getBookingById, cancelBooking } from "../controllers/booking.controller.js";

const bookingRouter = Router();

bookingRouter.post("/", authMiddleware, validateMiddleware(createBookingSchema), createBooking);
bookingRouter.get("/me", authMiddleware, myBookings);
bookingRouter.get("/:id", authMiddleware, getBookingById);
bookingRouter.patch("/:id/cancel", authMiddleware, cancelBooking);

export default bookingRouter;
