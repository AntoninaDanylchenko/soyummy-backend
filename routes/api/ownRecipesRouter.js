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

const { upload } = require("../../middlewares/ownRecipesUploadMiddleware");

router.use(authMiddleware);

router
  .route("/")
  .get(getAllRecipesController)
  .post(
    validateBody(recipeJoiSchema),
    upload.single("thumb"),
    createRecipeController
  );

router.route("/:recipeId").delete(deleteRecipeController);

module.exports = { ownRecipesRouter: router };
