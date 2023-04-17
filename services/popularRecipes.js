const { Recipe } = require('../models/Recipe');
const { HttpError } = require('../utils/HttpError');

const getOnePopularRecipe = async id => {
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw new HttpError(404, 'Not found such recipe');
  }
  return recipe;
};

module.exports = { getOnePopularRecipe };
