const { wrapper } = require("../middlewares/wrapper");
const { HttpError } = require("../utils/HttpError");
const { getAllRecipes, removeRecipe } = require("../services/ownRecipes");
const { Recipe } = require("../models/Recipe");

let getAllRecipesController = async (req, res, next) => {
  const { _id: owner } = req.user;

  const recipes = await getAllRecipes(owner);

  if (!recipes) {
    return new HttpError(404, "Not found");
  }

  res.status(200).json({ recipes });
};

let createRecipeController = async (req, res, next) => {
  const {
    title,
    category,
    area,
    instructions,
    description,
    time,
    youtube,
    tags,
    ingredients,
  } = req.body;

  const { _id: owner } = req.user;
  const { path } = req.file;
  const thumb = path;

  const previewArr = thumb.split("/");

  const newPreviewArr = previewArr.splice(5, 0, "c_crop,h_200,w_200");

  const newPreview = newPreviewArr.join("/");

  const parseIngr = JSON.parse(ingredients);

  const newRecipe = {
    title,
    category,
    area,
    instructions,
    description,
    preview: newPreview,
    time,
    youtube,
    tags,
    ingredients: parseIngr,
    thumb,
    owner,
  };

  const created = await Recipe.create(newRecipe);
  if (!created) {
    throw new HttpError("Error create recipe");
  }
  // await ownRecipes.unshift(created);
  // await req.user.save();

  res.status(201).json(created);
};

let deleteRecipeController = async (req, res, next) => {
  const { recipeId } = req.params;
  const { _id: owner } = req.user;

  const removed = await removeRecipe(recipeId, owner);

  if (!removed) throw new HttpError(404, "Not found");

  res.status(200).json({
    message: `Recipe with id:${recipeId} has been removed!`,
  });
};

getAllRecipesController = wrapper(getAllRecipesController);
createRecipeController = wrapper(createRecipeController);
deleteRecipeController = wrapper(deleteRecipeController);

module.exports = {
  getAllRecipesController,
  createRecipeController,
  deleteRecipeController,
};
