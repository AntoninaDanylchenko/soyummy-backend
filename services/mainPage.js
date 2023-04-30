const { Recipe } = require("../models/Recipe");

const getRecipesByCategory = async (category, limit) => {
  const recipes = await Recipe.find({
    category,
  }).limit(limit);
  return recipes;
};

module.exports = { getRecipesByCategory };
