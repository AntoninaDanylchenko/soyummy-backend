const { wrapper } = require("../../middlewares/wrapper");
const { Recipe } = require("../../models/Recipe");
const { HttpError } = require("../../utils/HttpError");

let getOneCategory = async (req, res, next) => {
  const { page, limit } = req.query;
  const { category } = req.params;

  const paginationPage = +page || 1;
  const paginationLimit = +limit || 8;
  const skip = (paginationPage - 1) * paginationLimit;

  const recipesList = await Recipe.find({ category })
    .skip(skip)
    .limit(paginationLimit);

  if (!recipesList) {
    throw new HttpError(404, "Not recipes found");
  }

  const recipeCount = await Recipe.find({ category }).count();

  if (!recipeCount) {
    throw new HttpError(404, "Not recipes count found");
  }

  res.status(200).json({ total: recipeCount, recipesList });
};

getOneCategory = wrapper(getOneCategory);

module.exports = { getOneCategory };
