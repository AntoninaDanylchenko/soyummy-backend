const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
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
    default: "",
  },
  thb: {
    type: String,
    required: true,
  },
});

const Ingredient = model("ingredient", ingredientSchema);

module.exports = { Ingredient };
