const { wrapper } = require('../middlewares/wrapper');
const { HttpError } = require('../utils/HttpError');
const { User } = require('../models/User');
const { getOnePopularRecipe } = require('../services/popularRecipes');

let getPopularRecipes = async (req, res) => {
  const { limit } = req.query;
  const topFavoriteRecipes = await User.aggregate([
    { $unwind: '$favoriteRecipes' },

    { $group: { _id: '$favoriteRecipes', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: +limit },
  ]);

  if (!topFavoriteRecipes.length) {
    throw new HttpError(404, 'Not found popular recipes');
  }

  const popularRecipes = await Promise.all(
    topFavoriteRecipes.map(({ _id }) => getOnePopularRecipe(_id))
  );
  res.status(200).json(popularRecipes);
};

getPopularRecipes = wrapper(getPopularRecipes);

module.exports = { getPopularRecipes };
