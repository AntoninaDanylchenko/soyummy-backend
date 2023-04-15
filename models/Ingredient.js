const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  ttl: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  t: {
    type: String,
    required: true,
  },
  thb: {
    type: String,
    required: true,
  },
});

const Ingredient = mongoose.model("ingredient", ingredientSchema);

module.exports = { Ingredient };
