const Joi = require("joi");

const { ObjectId } = require("mongoose").Types;

const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;

const joiRegisterSchema = Joi.object({
  username: Joi.string().min(1).max(16).required(),
  password: Joi.string()
    .pattern(passwordPattern)
    .messages({
      "string.pattern.base":
        "Password should contain minimum six characters, at least one letter and one number.",
    })
    .required(),
  email: Joi.string().email().required(),
  avatarURL: Joi.string(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string()
    .pattern(passwordPattern)
    .messages({
      "string.pattern.base":
        "Password should contain minimum six characters, at least one letter and one number.",
    })
    .required(),
});

const joiFavoriteRecipes = Joi.object({
  favoriteRecipes: Joi.array().items(Joi.string()),
});

const joiShoppingList = Joi.object({
  shoppingList: Joi.array()
    .items(
      Joi.object({
        ingredientId: Joi.string()
          .custom(ObjectId.isValid, "Object Id Validation")
          .required(),
        measure: Joi.array().items(Joi.string()).default([]),
      })
    )
    .default([]),
});

const joiUserSchema = Joi.object({
  username: Joi.string().min(1).max(16),
  avatarURL: Joi.string(),
});

// const joiOwnRecipes = Joi.object({
//   ownRecipes: Joi.array().items(
//     Joi.string().custom(ObjectId.isValid, "Object Id Validation")
//   ),
// });

module.exports = {
  joiRegisterSchema,
  joiLoginSchema,
  joiFavoriteRecipes,
  joiShoppingList,
  // joiOwnRecipes,
  joiUserSchema,
};
