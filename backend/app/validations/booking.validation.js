// validators/booking.schema.js
import Joi from "joi";

export const createBookingSchema = Joi.object({
  flightId: Joi.string().required().messages({
    "string.empty": "Flight ID is required",
  }),
  cabinClass: Joi.string().valid("economy", "business").required().messages({
    "string.empty": "Cabin class is required",
    "any.only": "Cabin class must be 'economy' or 'business'",
  }),
  passengers: Joi.array()
    .min(1)
    .items(
      Joi.object({
        firstName: Joi.string().trim().required().messages({
          "string.empty": "Passenger first name is required",
        }),
        lastName: Joi.string().trim().required().messages({
          "string.empty": "Passenger last name is required",
        }),
        gender: Joi.string().valid("male", "female").required().messages({
          "string.empty": "Passenger gender is required",
          "any.only": "Gender must be 'male' or 'female'",
        }),
      }),
    )
    .required()
    .messages({
      "array.min": "At least one passenger is required",
      "array.base": "Passengers must be an array",
    }),
}).options({ allowUnknown: false });
