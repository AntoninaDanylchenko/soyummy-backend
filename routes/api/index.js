const express = require("express");

const { authRouter } = require("./authRouter");
const { subscribeRouter } = require("./subscribeRouter");
const { recipesRouter } = require("./recipesRouter");
const { searchRouter } = require("./searchRouter");
const { ingredientsRouter } = require("./ingredientsRouter");
const { ownRecipesRouter } = require("./ownRecipesRouter");
const { favoriteRouter } = require("./favoriteRouter");
const { popularRecipeRouter } = require("./popularRecipeRouter");
const { shoppingListRouter } = require("./shoppingListRouter");

const router = express.Router();

router.route("/auth", authRouter);
router.route("/subscribe", subscribeRouter);
router.route("/recipes", recipesRouter);
router.route("/search", searchRouter);
router.route("/ingredients", ingredientsRouter);
router.route("/ownRecipes", ownRecipesRouter);
router.route("/favorite", favoriteRouter);
router.route("/popular-recipe", popularRecipeRouter);
router.route("/shopping-list", shoppingListRouter);

module.exports = { rootRouter: router };
