const { wrapper } = require("../middlewares/wrapper");

const { User } = require("../models/User");
const { Recipe } = require("../models/Recipe");

let addFavorite = async (req, res, next) => {
  const user = req.user;
  const { recipeId } = req.body;

  const recipe = await Recipe.findById(recipeId, {});
  if (!recipe) {
    res.status(404).json({ message: `Recipe with ID ${recipeId} not found.` });
    return;
  }

  await User.findOneAndUpdate(
    // this is method MongoDB
    { _id: user._id }, // search condition
    { $addToSet: { favoriteRecipes: recipeId } } //  in field favoriteRecipes add element recipeId
  );
  res.status(201).json({ message: "Added to favorite" });
};

addFavorite = wrapper(addFavorite);

let getFavorite = async (req, res, next) => {
  const user = req.user;
  const listFav = user.favoriteRecipes;
  const fav = await Recipe.find(
    {
      // from collection Recipe take all recipe matching condition below
      _id: {
        $in: listFav, // id of recipe must be in listFav
      },
    }, // and return only fields below
    { title: 1, description: 1, preview: 1, time: 1 }
  );

  res.status(200).json({
    data: fav,
  });
};

getFavorite = wrapper(getFavorite);

let deleteFavorite = async (req, res, next) => {
  const user = req.user;
  const { recipeId } = req.body;

  await User.findOneAndUpdate(
    { _id: user._id },
    { $pull: { favoriteRecipes: recipeId } } // method pull works like delete
  );

  // user.favoriteRecipes = user.favoriteRecipes.filter((_id) => _id !== recipeId);
  // await user.save();

  res.status(204).json();
};
deleteFavorite = wrapper(deleteFavorite);

module.exports = { addFavorite, getFavorite, deleteFavorite };
