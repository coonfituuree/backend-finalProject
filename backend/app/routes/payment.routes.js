import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { paySchema } from "../validations/payment.validation.js";
import { payBooking } from "../controllers/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post(
  "/pay",
  authMiddleware,
  validateMiddleware(paySchema),
  payBooking,
);

export default paymentRouter;
