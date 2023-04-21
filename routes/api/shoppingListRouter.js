const express = require("express");
const {
  addIngredientToShoppingList,
  removeIngredientFromShoppingList,
  getShoppingList,
} = require("../../controllers/shoppingList");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { mongoIdValidation } = require("../../middlewares/mongoIdValidation");

const router = express.Router();

router.use(authMiddleware);
router.post("/", mongoIdValidation, addIngredientToShoppingList);
router.delete("/", mongoIdValidation, removeIngredientFromShoppingList);
router.get("/", getShoppingList);

module.exports = {
  shoppingListRouter: router,
};
