import Joi from "joi";

export const flightSchema = Joi.object({
  from: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Departure city is required",
    "string.min": "Departure city must be at least 2 characters",
  }),
  fromAirport: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Departure airport is required",
  }),

  to: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Arrival city is required",
  }),
  toAirport: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Arrival airport is required",
  }),

  fromAirportAbbreviation: Joi.string()
    .length(3)
    .uppercase()
    .required()
    .messages({
      "string.length": "Departure airport abbreviation must be 3 characters",
    }),
  toAirportAbbreviation: Joi.string()
    .length(3)
    .uppercase()
    .required()
    .messages({
      "string.length": "Arrival airport abbreviation must be 3 characters",
    }),

  operatedBy: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Flight operator is required",
  }),
  flightNumber: Joi.string().trim().min(2).max(20).required().messages({
    "string.empty": "Flight number is required",
  }),

  airplaneType: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Airplane type is required",
  }),

  departureTime: Joi.string().required().messages({
    "string.empty": "Departure time is required",
  }),
  arrivalTime: Joi.string().required().messages({
    "string.empty": "Arrival time is required",
  }),

  departureDate: Joi.string().trim().min(10).max(10).required().messages({
    "string.empty": "Departure date is required",
  }),
  arrivalDate: Joi.string().trim().min(10).max(10).required().messages({
    "string.empty": "Arrival date is required",
  }),

  flightDuration: Joi.string().required().messages({
    "string.empty": "Flight duration is required",
  }),

  numberOfTransfers: Joi.number().integer().min(0).required().messages({
    "number.base": "Number of transfers must be a number",
    "number.min": "Number of transfers cannot be negative",
  }),

  economyPrice: Joi.number().positive().required().messages({
    "number.positive": "Economy price must be positive",
  }),
  businessPrice: Joi.number().positive().required().messages({
    "number.positive": "Business price must be positive",
  }),
});
