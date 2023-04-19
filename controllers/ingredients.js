const { Ingredient } = require("../models/Ingredient");
const { Recipe } = require("../models/Recipe");

const { wrapper } = require("../middlewares/wrapper");
const { HttpError } = require("../utils/HttpError");

let ingredientsList = async (req, res, next) => {
  const ingredientList = await Ingredient.find();
  if (!ingredientList) {
    throw new HttpError(404, "Not found ingredients list");
  }
  res.status(200).json({
    ingredientList,
  });
};

ingredientsList = wrapper(ingredientsList);

let ingredients = async (req, res, next) => {
  const { search } = req.query;

  if (!search) {
    throw new HttpError(400, "Bad request ingredient");
  }
  const filterIngredient = await Ingredient.find({
    ttl: { $regex: `${search}`, $options: "i" },
  });

  if (!filterIngredient) {
    throw new HttpError(404, "Not found ingredient");
  }
  const result = await Recipe.find({
    ingredients: {
      $elemMatch: {
        id: filterIngredient[0]._id,
      },
    },
  });

  if (!result) {
    throw new HttpError(404, "Not found recipe");
  }

  res.status(200).json({ result });
};

ingredients = wrapper(ingredients);

module.exports = { ingredientsList, ingredients };
