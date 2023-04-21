const Joi = require("joi");

const subscribeSchema = Joi.object({
  email: Joi.string().email().required(),
});
module.exports = { subscribeSchema };
