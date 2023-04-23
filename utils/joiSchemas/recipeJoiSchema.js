const Joi = require("joi");

const recipeJoiSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  area: Joi.string().required(),
  instructions: Joi.string().required(),
  description: Joi.string().required(),
  thumb: Joi.string(),
  preview: Joi.string(),
  time: Joi.string().required(),
  youtube: Joi.string().allow(null, ""),
  tags: Joi.array().items(Joi.string().required()),
  ingredients: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        measure: Joi.array().items(Joi.string()).default([]),
      })
    )
    .required(),
});

module.exports = {
  recipeJoiSchema,
};
