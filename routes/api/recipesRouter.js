const express = require('express');

const { wrapper } = require('../../middlewares/wrapper');
const { getCategoryList } = require('../../controllers/recipes/categoryList');
const { getOneCategory } = require('../../controllers/recipes/getOneCategory');
const { getAllRecipes } = require('../../controllers/recipes/mainPage');
const { getRecipeById } = require('../../controllers/recipes/getReceptesById');

const router = express.Router();

router.get('/category-list', getCategoryList);

router.get('/main-page', wrapper(getAllRecipes));

router.get('/:category', getOneCategory);

router.get('/id/:id', getRecipeById);

module.exports = { recipesRouter: router };
