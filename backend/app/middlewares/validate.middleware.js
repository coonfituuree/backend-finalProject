export const validateMiddleware = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      const errorMessage = error.details.map((e) => e.message).join(", ");

      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    req[property] = value;
    next();
  };
};
