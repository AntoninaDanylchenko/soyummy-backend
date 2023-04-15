const { Schema, model } = require("mongoose");

// const IngrSchema = new Schema({
//   id: {
//     type: String,
//     required: true,
//   },
//   measure: {
//     type: String,
//     required: true,
//   },
// });

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    youtube: {
      type: String,
    },
    tags: [String],
    // ingredients: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Ingredient",
    //   },
    // ],
    ingredients: {
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "ingredient",
          },
          measure: {
            type: [String],
            default: [],
          },
        },
      ],
    },
  },
  { versionKey: false, timestamps: true }
);

const Recipe = model("recipe", recipeSchema);

module.exports = { Recipe };
