const express = require("express");

const {
  getCategoryList,
  getOneCategory,
  getAllRecipes,
  getRecipeById,
} = require("../../controllers/recipes");

const router = express.Router();

router.get("/category-list", getCategoryList);

router.get("/main-page", getAllRecipes);

router.get("/:category", getOneCategory);

router.get("/id/:id", getRecipeById);

module.exports = { recipesRouter: router };
