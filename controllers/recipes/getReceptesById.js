const {
  Types: { ObjectId },
} = require("mongoose");

const { wrapper } = require("../../middlewares/wrapper");
const { Recipe } = require("../../models/Recipe");
const { HttpError } = require("../../utils/HttpError");

let getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    throw new HttpError(400, "Invalid recipe id");
  }

  const recipe = await Recipe.findById(id);

  if (!recipe) {
    throw new HttpError(404, "Recipe not found");
  }

  res.status(200).json({ recipe });
};

getRecipeById = wrapper(getRecipeById);

module.exports = { getRecipeById };
