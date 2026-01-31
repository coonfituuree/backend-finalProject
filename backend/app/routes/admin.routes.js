import { Router } from "express";
import { getAllUsers, postFlight, postFlightsBulk } from "../controllers/admin.controller.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { flightSchema } from "../validations/flight.validation.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

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
export default adminRouter;
