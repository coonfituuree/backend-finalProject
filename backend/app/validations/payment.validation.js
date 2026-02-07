import Joi from "joi";

export const paySchema = Joi.object({
  bookingId: Joi.string().required().messages({
    "string.empty": "Booking ID is required",
  }),

  cardNumber: Joi.string()
    .pattern(/^\d{13,19}$/)
    .required()
    .messages({
      "string.empty": "Card number is required",
      "string.pattern.base": "Card number must contain 13-19 digits",
    }),
  expMonth: Joi.number().integer().min(1).max(12).required().messages({
    "number.base": "Expiration month must be a number",
    "number.min": "Month must be from 1 to 12",
    "number.max": "Month must be from 1 to 12",
  }),
  expYear: Joi.number().integer().min(25).max(90).required().messages({
    "number.base": "Expiration year must be a number",
    "number.min": "Year must be 2025 or later",
  }),
  cvv: Joi.string()
    .pattern(/^\d{3,4}$/)
    .required()
    .messages({
      "string.empty": "CVV is required",
      "string.pattern.base": "CVV must contain 3-4 digits",
    }),
}).options({ allowUnknown: false });
