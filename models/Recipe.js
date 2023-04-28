const { Schema, model } = require("mongoose");

const ingredientsSchema = new Schema({
  id: {
    type: String,
    // ref: "ingredient",
  },
  measure: {
    type: String,
    default: null,
  },
});

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Add title"],
    },
    category: {
      type: String,
      required: [true, "Add a category"],
    },
    area: {
      type: String,
      default: null,
    },
    instructions: {
      type: String,
      required: [true, "Write an instructions"],
    },
    description: {
      type: String,
      required: [true, "Add a short description to the recipe"],
    },
    thumb: {
      type: String,
      // required: [true, "Add image of the dish"],
    },
    preview: {
      type: String,
      default: null,
    },
    time: {
      type: String,
      required: true,
    },
    youtube: {
      type: String,
      default: null,
    },
    tags: [String],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ingredients: [ingredientsSchema],
  },
  { versionKey: false, timestamps: true }
);

const Recipe = model("recipe", recipeSchema);

module.exports = { Recipe };
