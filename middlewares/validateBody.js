const { HttpError } = require("../utils/HttpError");

const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    console.log(result);
    if (result.error) {
      throw new HttpError(400, result.error.message);
    }
    next();
  };
};

// module.exports = { validateBody };

// const validateBody = (schema, msg) => {
//   return (req, _, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       error.statusCode = 400;
//       if (msg) error.message = msg;
//       next(error);
//     }
//     next();
//   };
// };

module.exports = { validateBody };
