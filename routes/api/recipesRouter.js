const express = require('express');

const { wrapper } = require('../../middlewares/wrapper');
const { getCategoryList } = require('../../controllers/recipes/categoryList');
const { getAllRecipes } = require('../../controllers/recipes/mainPage');

const router = express.Router();

router.get('/category-list', getCategoryList);

router.get('/main-page', wrapper(getAllRecipes));

// router.get("/:caregory");

// router.get("/:id");

module.exports = { recipesRouter: router };
