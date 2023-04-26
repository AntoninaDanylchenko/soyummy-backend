const { wrapper } = require("../middlewares/wrapper");
const { Recipe } = require("../models/Recipe");
const { HttpError } = require("../utils/HttpError");

let searchRecipes = async (req, res, next) => {
  const search = req.query.search;

  if (!search) {
    throw new HttpError(400, "Bad request");
  }
  try {
    const result = await Recipe.find({
      title: { $regex: search, $options: "i" },
    });
    if (!result || result.length === 0) {
      throw new HttpError(404, "Not found recipe");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
searchRecipes = wrapper(searchRecipes);

module.exports = {
  searchRecipes,
};
