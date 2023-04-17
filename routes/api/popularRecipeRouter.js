const express = require('express');

const { getPopularRecipes } = require('../../controllers/popularRecipes');

const router = express.Router();

router.get('/', getPopularRecipes);

module.exports = { popularRecipeRouter: router };
