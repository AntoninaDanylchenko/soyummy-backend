const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  getAllRecipesController,
  createRecipeController,
  deleteRecipeController,
} = require("../../controllers/ownRecipes");
const { validateBody } = require("../../middlewares/validateBody");
const { recipeJoiSchema } = require("../../utils/joiSchemas/recipeJoiSchema");

router.use(authMiddleware);

router
  .route("/")
  .get(getAllRecipesController)
  .post(validateBody(recipeJoiSchema), createRecipeController);

router.route("/:recipeId").delete(deleteRecipeController);

module.exports = { ownRecipesRouter: router };

// "post": {
//         "tags": ["Own recipe"],
//         "summary": "Add recipe to own recipes",
//         "parameters": [],
//         "security": [{ "Bearer": [] }],
//         "requestBody": {
//           "description": "Ingredient object",
//           "required": true,
//           "content": {
//             "application/json": {
//               "schema": {
//                 "$ref": "#/components/schemas/ShoppingListRequest"
//               }
//             }
//           }
//         },
//         "responses": {
//           "200": {
//             "description": "Successful operation",
//             "content": {
//               "application/json": {
//                 "schema": {
//                   "$ref": "#/components/schemas/PostShoppingListResponse"
//                 }
//               }
//             }
//           }
//         }
//       },
