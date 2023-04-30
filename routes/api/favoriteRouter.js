const express = require("express");
const {
  addFavorite,
  getFavorite,
  deleteFavorite,
} = require("../../controllers/favorite");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.route("/").post(addFavorite).get(getFavorite).delete(deleteFavorite);

// router.post("/", addFavorite);
// router.get("/", getFavorite);
// router.delete("/", deleteFavorite);

module.exports = { favoriteRouter: router };
