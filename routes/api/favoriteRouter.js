const express = require("express");
const {
    addFavorite,
    getFavorite,
    deleteFavorite,
} = require("../../controllers/favorite");

const router = express.Router();

router.post("/", addFavorite);
router.get("/", getFavorite);
router.put("/", deleteFavorite);

module.exports = { favoriteRouter: router };
