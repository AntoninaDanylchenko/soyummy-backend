const { wrapper } = require("../middlewares/wrapper");

let addFavorite = async (req, res, next) => {};
addFavorite = wrapper(addFavorite);

let getFavorite = async (req, res, next) => {};
getFavorite = wrapper(getFavorite);

let deleteFavorite = async (req, res, next) => {};
deleteFavorite = wrapper(deleteFavorite);

module.exports = { addFavorite, getFavorite, deleteFavorite };
