const express = require("express");

const { getCategoryList } = require("../../controllers/recipes/categoryList");

const router = express.Router();

router.get("/category-list", getCategoryList);

// router.get("/main-page");

// router.get("/:caregory");

// router.get("/:id");

module.exports = { recipesRouter: router };
