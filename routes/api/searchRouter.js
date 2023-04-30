const express = require("express");
const { searchRecipes } = require("../../controllers/search");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", searchRecipes);

module.exports = { searchRouter: router };
