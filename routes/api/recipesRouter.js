const express = require("express");

const router = express.Router();

router.get("/category-list");

router.get("/main-page");

router.get("/:caregory");

router.get("/:id");

module.exports = { recipesRouter: router };
