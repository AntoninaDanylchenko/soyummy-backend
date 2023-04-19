const Joi = require("joi");

const subscribeSchema = Joi.object({
  putEmail: Joi.string().require(),
});
module.exports = subscribeSchema;
