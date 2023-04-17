const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes/getRecipesBuHeader');

router.get('/search', recipeController.searchRecipes);

module.exports = router;