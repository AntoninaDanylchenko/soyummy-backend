const { getRecipesByCategory } = require('../../services/recipes/mainPage');

const defaultCategory = ['Breakfast', 'Miscellaneous', 'Chicken', 'Dessert'];

const getAllRecipes = async (_, res) => {
  const recipesArrays = await Promise.all(defaultCategory.map(getRecipesByCategory));
  const recipesAll = recipesArrays.flat();

  res.status(200).json(recipesAll);
};

module.exports = { getAllRecipes };
