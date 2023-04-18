const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Create your password!"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    ownRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    // favoriteRecipes: [String],
    favoriteRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
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
    refresh_token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    subscription: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.isPasswordCorrect = async function (password) {
  const user = this;
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  return isPasswordCorrect;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, 12);
  next();
});

const User = model("user", userSchema);

module.exports = { User };
