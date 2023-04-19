const { wrapper } = require("../middlewares/wrapper");
const { HttpError } = require("../utils/HttpError");
const { Ingredient } = require("../models/Ingredient");

let addIngredientToShoppingList = async (req, res, next) => {
  req.user.shoppingList.push(req.body);
  const user = await req.user.save();
  if (!user) {
    throw new HttpError(500, "Write error");
  }
  res.status(201).json(user);
};
addIngredientToShoppingList = wrapper(addIngredientToShoppingList);

let removeIngredientFromShoppingList = async (req, res, next) => {
  const shoppingList = req.user.shoppingList.filter(
    (ingredient) => ingredient.id !== req.body.id
  );
  req.user.shoppingList = shoppingList;
  const user = await req.user.save();
  if (!user) {
    throw new HttpError(500, "Write error");
  }
  res.status(201).json(user);
};
removeIngredientFromShoppingList = wrapper(removeIngredientFromShoppingList);

let getShoppingList = async (req, res, next) => {
  const shoppingList = await Promise.all(
    req.user.shoppingList.map(async (item) => {
      return {
        id: item.id,
        measure: item.measure,
        ingredient: await Ingredient.findOne({
          _id: item.ingredientId,
        }),
      };
    })
  );
  res.status(200).json(shoppingList);
};
getShoppingList = wrapper(getShoppingList);

module.exports = {
  addIngredientToShoppingList,
  removeIngredientFromShoppingList,
  getShoppingList,
};
