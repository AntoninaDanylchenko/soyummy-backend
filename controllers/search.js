const { wrapper } = require("../middlewares/wrapper");
const { Recipe } = require("../models/Recipe");
const { HttpError } = require("../utils/HttpError");

let searchRecipes = async (req, res) => {
  const search = req.query.search;

  const result = await Recipe.find({
    title: { $regex: search, $options: "i" },
  });
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json({ result });
};
searchRecipes = wrapper(searchRecipes);

module.exports = {
  searchRecipes,
};