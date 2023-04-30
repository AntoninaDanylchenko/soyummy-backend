const express = require("express");

const {
  ingredientsList,
  ingredients,
} = require("../../controllers/ingredients");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/list", ingredientsList);
router.get("/", ingredients);

module.exports = { ingredientsRouter: router };
