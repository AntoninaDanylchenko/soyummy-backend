const express = require('express');

const { getCategoryList } = require('../../controllers/recipes/categoryList');
const { getOneCategory } = require('../../controllers/recipes/getOneCategory');
const { getAllRecipes } = require('../../controllers/recipes/mainPage');

const router = express.Router();

router.get('/category-list', getCategoryList);

router.get('/main-page', getAllRecipes);

router.get('/:category', getOneCategory);

// router.get("/:id");

module.exports = { recipesRouter: router };
