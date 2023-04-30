const express = require("express");

const { getPopularRecipes } = require("../../controllers/popularRecipes");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getPopularRecipes);

module.exports = { popularRecipeRouter: router };
