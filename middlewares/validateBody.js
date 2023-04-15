const HttpError = require("../utils/HttpError");

const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    console.log(result);
    if (result.errors) {
      return next(new HttpError(400, result.errors.message));
    }
    next();
  };
};

module.exports = { validateBody };
