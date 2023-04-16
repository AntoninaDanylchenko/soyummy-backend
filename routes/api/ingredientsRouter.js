const express = require("express");

const {
  ingredientsList,
  ingredients,
} = require("../../controllers/ingredients");

const router = express.Router();

router.get("/list", ingredientsList);
router.get("/", ingredients);

module.exports = { ingredientsRouter: router };
