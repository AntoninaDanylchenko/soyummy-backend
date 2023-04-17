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

  res.status(200).json({
    status: "success",
    code: "200",
    data: {
      recipes,
    },
  });
};

let createRecipeController = async (req, res, next) => {
  const { body } = req;
  const { _id: owner } = req.user;

  await createRecipe(body, owner);

  res.status(201).json({
    message: `New recipe has been created!`,
    status: "created",
    code: "201",
  });
};

let deleteRecipeController = async (req, res, next) => {
  const { recipeId } = req.params;
  const { _id: owner } = req.user;

  const removed = await removeRecipe(recipeId, owner);

  if (!removed) throw new HttpError(404, "Not found");

  res.status(200).json({
    message: `Recipe with id:${recipeId} has been removed!`,
    status: "success",
    code: "200",
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
