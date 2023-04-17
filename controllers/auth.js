const { wrapper } = require("../middlewares/wrapper");
const gravatar = require("gravatar");
// const path = require("path");
require("dotenv").config();

const { assignTokens } = require("../services/auth");
const { User } = require("../models/User");
const { HttpError } = require("../utils/HttpError");

let userSignup = async (req, res, next) => {
  const { email, password, username } = req.body;
  const isEmailUnique = await User.findOne({ email });
  if (isEmailUnique) {
    throw new HttpError(409, "Email should be unique");
  }

  const avatarURL = gravatar.url(email);
  // avatarURL: req.file.path;
  const newUser = await User.create({ username, email, password, avatarURL });
  newUser.password = undefined;
  res.status(201).json(newUser);
};
userSignup = wrapper(userSignup);

let userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, "Email or password is incorrect");
  }

  const isPasswordCorrect = user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new HttpError(401, "Email or password is incorrect");
  }

  const { accessToken, refreshToken } = assignTokens(user);
  await User.findByIdAndUpdate(user._id, { refresh_token: refreshToken });
  user.password = undefined;
  res.json({ user, token: accessToken });
};
userLogin = wrapper(userLogin);

let userLogout = async (req, res, next) => {};
userLogout = wrapper(userLogout);

module.exports = { userSignup, userLogin, userLogout };
