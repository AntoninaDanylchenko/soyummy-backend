const { Recipe } = require('../../models/Recipe');

const getRecipesByCategory = async category => {
  const recipes = await Recipe.find({
    category,
  }).limit(4);
  return recipes;
};

module.exports = { getRecipesByCategory };
