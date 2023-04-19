const { wrapper } = require("../middlewares/wrapper");
const { HttpError } = require("../utils/HttpError");
const {
  getAllRecipes,
  createRecipe,
  removeRecipe,
} = require("../services/ownRecipes");

let getAllRecipesController = async (req, res, next) => {
  const { _id: owner } = req.user;

  const recipes = await getAllRecipes(owner);

  res.status(200).json({ recipes});
};

let createRecipeController = async (req, res, next) => {
  const { body } = req;
  const { _id: owner, ownRecipes } = req.user;

  const created = await createRecipe(body, owner);

  if (created) {
    await ownRecipes.unshift(created);
    await req.user.save();
  }

  res.status(201).json({
    message: `New recipe has been created!`
  });
};

let deleteRecipeController = async (req, res, next) => {
  const { recipeId } = req.params;
  const { _id: owner } = req.user;

  const removed = await removeRecipe(recipeId, owner);

  if (!removed) throw new HttpError(404, "Not found");

  res.status(200).json({
    message: `Recipe with id:${recipeId} has been removed!`
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
