import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(12).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 6 characters",
    "string.max": "Username must be no more than 12 characters",
    "string.alphanum": "Username must contain only letters and numbers",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
  }),
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\-])[A-Za-z\d@$!%*?&#^()_+=\-]+$/,
    )
    .required()
    .trim()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain uppercase and lowercase letters, numbers and special characters",
    }),
  firstName: Joi.string()
    .pattern(/^[A-Za-zА-Яа-я]+$/)
    .required()
    .trim()
    .messages({
      "string.empty": "First name is required",
      "string.pattern.base": "First name must contain only letters",
    }),
  lastName: Joi.string()
    .pattern(/^[A-Za-zА-Яа-я]+$/)
    .required()
    .trim()
    .messages({
      "string.empty": "Last name is required",
      "string.pattern.base": "Last name must contain only letters",
    }),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be 10 to 15 digits",
    }),
}).options({ allowUnknown: false });

export const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(12).messages({
    "string.min": "Username must be at least 6 characters",
    "string.max": "Username must be no more than 12 characters",
  }),
  email: Joi.string().email().messages({
    "string.email": "Email must be valid",
  }),
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\-])[A-Za-z\d@$!%*?&#^()_+=\-]+$/,
    )
    .required()
    .trim()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain uppercase and lowercase letters, numbers and special characters",
    }),
})
  .xor("username", "email")
  .messages({
    "object.xor": "Provide either username or email",
  });

export const otpSchema = Joi.object({
  otp: Joi.string().length(6).pattern(/^\d+$/).required().messages({
    "string.empty": "OTP is required",
    "string.length": "OTP must be 6 characters",
    "string.pattern.base": "OTP must contain only numbers",
  }),
});
