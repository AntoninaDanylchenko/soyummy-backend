const Joi = require("joi");

const subscribeSchema = Joi.object({
  inputEmail: Joi.string().min(3).required().email(),
});
module.exports = { subscribeSchema };
