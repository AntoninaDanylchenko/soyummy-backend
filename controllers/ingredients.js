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

  let filterIngredient;
  try {
    filterIngredient = await Ingredient.find({
      ttl: { $regex: `${search}`, $options: "i" },
    });
  } catch (error) {
    throw new HttpError(404, `Not found ingredient: ${error.message}`);
  }
  // console.log(filterIngredient);

  let recipeForSearch = [];
  // let result;
  try {
    for (let i = 0; i < filterIngredient.length; i = i + 1) {
      const result = await Recipe.find({
        ingredients: {
          $elemMatch: {
            id: filterIngredient[i]._id,
          },
        },
      });
      if (!result) {
        return;
      }
      recipeForSearch = [...recipeForSearch, ...result];
    }
    // const resultRecipes = filterIngredient.filter(async (ingredient) => {
    //   const result = await Recipe.find({
    //     ingredients: {
    //       $elemMatch: {
    //         id: ingredient._id,
    //       },
    //     },
    //   });
    //   if (!result) {
    //     return;
    //   }
    //   return [...recipeForSearch, ...result];
    // });

    if (!recipeForSearch) {
      throw new HttpError(404, "Not found recipe");
    }

    res.status(200).json(recipeForSearch);
  } catch (error) {
    throw new HttpError(404, `Not found recipe: ${error.message}`);
  }
};

ingredients = wrapper(ingredients);

module.exports = { ingredientsList, ingredients };
