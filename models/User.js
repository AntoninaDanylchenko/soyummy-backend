const { Schema, model } = require("mongoose");
// const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    ownRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    favoriteRecipes: [String],
    shoppingList: {
      _id: false,
      type: [
        {
          ingredientId: {
            type: Schema.Types.ObjectId,
            ref: "Ingredient",
          },
          measure: {
            type: [String],
            default: [],
          },
        },
      ],
      default: [],
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// userSchema.methods.isPasswordCorrect = async function (password) {
//   const user = this;
//   console.log("user", user);
//   const isPasswordCorrect = await bcrypt.compare(password, user.password);

//   return isPasswordCorrect;
// };

// // hooks - перед events
// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified("password")) {
//     return next();
//   }
//   user.password = await bcrypt.hash(user.password, 12);
//   next();
// });

const User = model("user", userSchema);

module.exports = { User };
