const { Schema, model } = require("mongoose");

// const ingredientIdSchema = new Schema({
//   productId: {
//     type: String,
//     required: true,
//   },
//   measure: {
//     type: String,
//     required: true,
//   },
// });
// var mySchemaObj = new MySchema(
//   {mySubSchema: [new MySubSchema(  //<-- Shouldn't have array "[" here
//        {
//           type: "foo",
//           meta: "bar"
//        }
//     )]
//   }
// )

// const ingredientIdSchema = new Schema({
//   productId: {
//     type: Schema.Types.ObjectId,
//     ref: "ingredientId",
//   },
//   measure: {
//     type: String,
//   },
// });

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
    // ingredients: {
    //   type: array
    //   ref: "ingredientId",
    // },
    ingredients: {
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "ingredientId",
          },
          measure: {
            type: String,
            default: null,
          },
        },
      ],
    },
  },
  { versionKey: false, timestamps: true }
);

const Recipe = model("recipe", recipeSchema);
// const IngredientId = model("ingredientId", ingredientIdSchema);

module.exports = { Recipe };
