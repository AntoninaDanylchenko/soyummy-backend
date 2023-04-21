const express = require("express");
const {
    addFavorite,
    getFavorite,
    deleteFavorite,
} = require("../../controllers/favorite");
const { authMiddleware } = require("../../middlewares/authMiddleware")
const router = express.Router();

router.post("/", authMiddleware, addFavorite);
router.get("/", authMiddleware, getFavorite);
router.delete("/", authMiddleware, deleteFavorite);

module.exports = { favoriteRouter: router };
