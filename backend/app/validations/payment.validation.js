import Joi from "joi";

export const paySchema = Joi.object({
  bookingId: Joi.string().required(),

  cardNumber: Joi.string().pattern(/^\d{13,19}$/).required(),
  expMonth: Joi.number().integer().min(1).max(12).required(),
  expYear: Joi.number().integer().min(25).max(90).required(),
  cvv: Joi.string().pattern(/^\d{3,4}$/).required(),
}).options({ allowUnknown: false });
