const {
  Types: { ObjectId },
} = require("mongoose");

const { wrapper } = require("../middlewares/wrapper");
const { Recipe } = require("../models/Recipe");
const { HttpError } = require("../utils/HttpError");
const { getRecipesByCategory } = require("../services/mainPage");

let getCategoryList = async (req, res, next) => {
  const categories = await Recipe.find({}, { category: 1, _id: 0 }).sort({
    category: 1,
  });

  if (!categories) {
    throw new HttpError(404, "Not found");
  }

  const uniqueCategories = categories
    .map((category) => {
      return category.category;
    })
    .filter((category, index, array) => array.indexOf(category) === index);

  res.status(200).json(uniqueCategories);
};

getCategoryList = wrapper(getCategoryList);

// let getOneCategory = async (req, res, next) => {
//   const { page, limit } = req.query;
//   const { category } = req.params;

//   const paginationPage = +page || 1;
//   const paginationLimit = +limit || 8;
//   const skip = (paginationPage - 1) * paginationLimit;

//   const recipesList = await Recipe.find({ category })
//     .skip(skip)
//     .limit(paginationLimit);

//   if (!recipesList) {
//     throw new HttpError(404, "Not recipes found");
//   }

//   const recipeCount = await Recipe.find({ category }).count();

//   if (!recipeCount) {
//     throw new HttpError(404, "Not recipes count found");
//   }

//   res.status(200).json({ total: recipeCount, recipesList });
// };
let getOneCategory = async (req, res, next) => {
  const { category } = req.params;

  const recipesList = await Recipe.find({ category });

  if (!recipesList) {
    throw new HttpError(404, "Not recipes found");
  }

  res.status(200).json({ recipesList });
};

getOneCategory = wrapper(getOneCategory);

let getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  const recipe = await Recipe.aggregate([
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "ingredients",
        localField: "ingredients.id",
        foreignField: "_id",
        as: "ingr_nfo",
      },
    },
    {
      $set: {
        ingredients: {
          $map: {
            input: "$ingredients",
            in: {
              $mergeObjects: [
                "$$this",
                {
                  $arrayElemAt: [
                    "$ingr_nfo",
                    {
                      $indexOfArray: ["$ingr_nfo._id", "$$this.id"],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $unset: ["ingr_nfo", "ingredients.id"],
    },
  ]);

  if (!recipe) {
    throw new HttpError(404, "Recipe not found");
  }

  res.status(200).json({
    data: {
      recipe: recipe[0],
    },
  });
};

getRecipeById = wrapper(getRecipeById);

const defaultCategory = ["Breakfast", "Miscellaneous", "Chicken", "Dessert"];

let getAllRecipes = async (req, res) => {
  const { limit } = req.query;
  const recipesArrays = await Promise.all(
    defaultCategory.map((category) => getRecipesByCategory(category, limit))
  );

  if (!recipesArrays) {
    throw new HttpError(404, "Recipes not found");
  }

  const recipesAll = recipesArrays.flat();

  res.status(200).json(recipesAll);
};

getAllRecipes = wrapper(getAllRecipes);

module.exports = {
  getCategoryList,
  getOneCategory,
  getRecipeById,
  getAllRecipes,
};
