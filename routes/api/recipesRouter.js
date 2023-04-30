const express = require("express");

const {
  getCategoryList,
  getOneCategory,
  getAllRecipes,
  getRecipeById,
} = require("../../controllers/recipes");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/category-list", getCategoryList);

router.get("/main-page", getAllRecipes);

router.get("/:category", getOneCategory);

router.get("/id/:id", getRecipeById);

module.exports = { recipesRouter: router };
