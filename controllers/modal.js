const { wrapper } = require("../middlewares/wrapper");
const { convertMs } = require("../utils/convertMs");

let getInfoAboutUser = async (req, res, next) => {
  const user = req.user;

  const amoutOwnRecipes = user.ownRecipes.lenght ? user.ownRecipes.lenght : 0;
  const amoutFavoriteRecipes = user.favoriteRecipes.lenght
    ? user.favoriteRecipes.lenght
    : 0;

  const date = new Date();
  const dayRejestration = user.createdAt;
  const timeInAplication = date.getTime() - dayRejestration.getTime();
  const time = convertMs(timeInAplication);

  res
    .status(200)
    .json({ amoutOwnRecipes, amoutFavoriteRecipes, days: time.days });
};

getInfoAboutUser = wrapper(getInfoAboutUser);

module.exports = { getInfoAboutUser };
