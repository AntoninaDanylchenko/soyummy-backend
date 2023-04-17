const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  getAllRecipesController,
  createRecipeController,
  deleteRecipeController,
} = require("../../controllers/ownRecipes");
const { validateBody } = require("../../middlewares/validateBody");
const { recipeJoiSchema } = require("../../utils/joiSchemas/recipeJoiSchema");

router.use(authMiddleware);

router
  .route("/")
  .get(getAllRecipesController)
  .post(validateBody(recipeJoiSchema), createRecipeController);

router.route("/:recipeId").delete(deleteRecipeController);

module.exports = { ownRecipesRouter: router };
