const Joi = require("joi");

const subscribeValidate = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

module.exports = { subscribeValidate };
