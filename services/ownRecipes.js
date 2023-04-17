const { Recipe } = require("../models/Recipe");

const getAllRecipes = async (owner) => {
  return await Recipe.find({ owner });
};

const createRecipe = async (
  {
    title,
    category,
    area,
    instructions,
    description,
    thumb,
    preview,
    time,
    youtube,
    tags,
    ingredients,
  },
  owner
) => {
  return await Recipe.create({
    title,
    category,
    area,
    instructions,
    description,
    thumb,
    preview,
    time,
    youtube,
    tags,
    ingredients,
    owner,
  });
};

const removeRecipe = async (id, owner) => {
  return await Recipe.findOneAndRemove({ _id: id, owner });
};

module.exports = {
  getAllRecipes,
  createRecipe,
  removeRecipe,
};
