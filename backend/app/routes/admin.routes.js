import { Router } from "express";
import { getAllUsers, postFlight, postFlightsBulk, getAllFlights } from "../controllers/admin.controller.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { flightSchema } from "../validations/flight.validation.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import { getAllBookings } from "../controllers/booking.controller.js";

const adminRouter = Router();

adminRouter.get("/users", authMiddleware, adminMiddleware, getAllUsers);
adminRouter.post(
  "/flight/add",
  authMiddleware,
  adminMiddleware,
  validateMiddleware(flightSchema),
  postFlight,
);
adminRouter.post("/flight/add/bulk", authMiddleware, adminMiddleware, postFlightsBulk)
adminRouter.get("/flights/", authMiddleware, adminMiddleware, getAllFlights);

adminRouter.get("/bookings/all", authMiddleware, adminMiddleware, getAllBookings)

export default adminRouter;
