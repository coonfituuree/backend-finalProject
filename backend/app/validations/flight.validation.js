import Joi from "joi"

export const flightSchema = Joi.object({
  from: Joi.string().trim().min(2).max(50).required(),
  fromAirport: Joi.string().trim().min(2).max(100).required(),

  to: Joi.string().trim().min(2).max(50).required(),
  toAirport: Joi.string().trim().min(2).max(100).required(),

  fromAirportAbbreviation: Joi.string().length(3).uppercase().required(),
  toAirportAbbreviation: Joi.string().length(3).uppercase().required(),


  operatedBy: Joi.string().trim().min(2).max(100).required(),
  flightNumber: Joi.string().trim().min(2).max(20).required(),

  airplaneType: Joi.string().trim().min(2).max(50).required(),

  departureTime: Joi.string().required(),
  arrivalTime: Joi.string().required(),

  departureDate: Joi.string().trim().min(10).max(10).required(),
  arrivalDate: Joi.string().trim().min(10).max(10).required(),

  flightDuration: Joi.string().required(),

  numberOfTransfers: Joi.number().integer().min(0).required(),

  economyPrice: Joi.number().positive().required(),
  businessPrice: Joi.number().positive().required(),
});
