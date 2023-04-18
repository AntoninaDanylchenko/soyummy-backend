const express = require("express");

const { authRouter } = require("./authRouter");
// const { subscribeRouter } = require("./subscribeRouter");
const { recipesRouter } = require("./recipesRouter");
// const { searchRouter } = require("./searchRouter");
const { ingredientsRouter } = require("./ingredientsRouter");
// const { ownRecipesRouter } = require("./ownRecipesRouter");
// const { favoriteRouter } = require("./favoriteRouter");
const { popularRecipeRouter } = require("./popularRecipeRouter");
const { shoppingListRouter } = require("./shoppingListRouter");

const router = express.Router();

router.use("/auth", authRouter);
// router.use("/subscribe", subscribeRouter);
router.use("/recipes", recipesRouter);
// router.use("/search", searchRouter);
router.use("/ingredients", ingredientsRouter);
// router.use("/ownRecipes", ownRecipesRouter);
// router.use("/favorite", favoriteRouter);
router.use("/popular-recipe", popularRecipeRouter);
router.use("/shopping-list", shoppingListRouter);

module.exports = { rootRouter: router };
