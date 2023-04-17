const express = require("express");
const router = express.Router();

const {
  getAllRecipesController,
  createRecipeController,
  deleteRecipeController,
} = require("../../controllers/ownRecipes");
const { validateBody } = require("../../middlewares/validateBody");
const { recipeJoiSchema } = require("../../utils/joiSchemas/recipeJoiSchema");

router
  .route("/ownRecipes")
  .get(getAllRecipesController)
  .post(validateBody(recipeJoiSchema), createRecipeController);

router.route("/ownRecipes/:recipeId").delete(deleteRecipeController);

module.exports = { ownRecipesRouter: router };
