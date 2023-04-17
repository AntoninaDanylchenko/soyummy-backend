const { wrapper } = require("../../middlewares/wrapper");
const { User } = require("../../models/User");
const { HttpError } = require("../../utils/HttpError");

let getInfoAboutUser = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) {
    throw new HttpError(401, "Not authorized");
  }
  const quantyOwnRecipes = user.ownRecipes.lenght;
  const quantyFavoriteRecipes = user.favoriteRecipes.lenght;
  // user.createdAt;

  res.status(200).json({ quantyOwnRecipes, quantyFavoriteRecipes });
};

getInfoAboutUser = wrapper(getInfoAboutUser);

module.exports = { getInfoAboutUser };
