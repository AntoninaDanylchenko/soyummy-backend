const express = require("express");
const { searchRecipes } = require("../../controllers/search");

const router = express.Router();

router.get("/", searchRecipes);

module.exports = { searchRouter: router };