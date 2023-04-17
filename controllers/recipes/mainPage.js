const { getRecipesByCategory } = require('../../services/recipes/mainPage');
const { wrapper } = require('../../middlewares/wrapper');

const defaultCategory = ['Breakfast', 'Miscellaneous', 'Chicken', 'Dessert'];

let getAllRecipes = async (_, res) => {
  const recipesArrays = await Promise.all(defaultCategory.map(getRecipesByCategory));
  const recipesAll = recipesArrays.flat();

  res.status(200).json(recipesAll);
};
getAllRecipes = wrapper(getAllRecipes);
module.exports = { getAllRecipes };
