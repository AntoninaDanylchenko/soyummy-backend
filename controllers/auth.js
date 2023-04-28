const gravatar = require("gravatar");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const { wrapper } = require("../middlewares/wrapper");
const { assignTokens } = require("../services/auth");
const { User } = require("../models/User");
const { HttpError } = require("../utils/HttpError");

let userSignup = async (req, res, _) => {
  const { email, password, username } = req.body;

  const isEmailUnique = await User.findOne({ email });
  if (isEmailUnique) {
    throw new HttpError(409, "Email should be unique");
  }

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    username,
    email,
    password,
    avatarURL,
  });

  newUser.password = undefined;

  const resUser = {
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    avatarURL: newUser.avatarURL,
  };
  res.status(201).json({ resUser });
};
userSignup = wrapper(userSignup);

let userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401, "Email or password is incorrect");
  }

  // const isPasswordCorrect = await user.isPasswordCorrect({ password });
  // return isPasswordCorrect;
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new HttpError(401, "Email or password is incorrect");
  }

  const { accessToken, refreshToken } = assignTokens(user);

  await User.findByIdAndUpdate(user._id, { refresh_token: refreshToken });
  user.password = undefined;
  const resUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
    avatarURL: user.avatarURL,
  };

  res.status(200).json({ resUser, token: accessToken, refreshToken });
};
userLogin = wrapper(userLogin);

let getCurrentUser = async (req, res) => {
  const { user } = req;
  const resUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
    avatarURL: user.avatarURL,
  };
  res.status(200).json({ resUser });
};
getCurrentUser = wrapper(getCurrentUser);

let userLogout = async (req, res, _) => {
  const { _id, refresh_token } = req.user;
  const user = await User.findOne({ refresh_token });

  if (!user) {
    throw new HttpError(401, "Not authorized");
  }

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "No Content" });
};
userLogout = wrapper(userLogout);

module.exports = {
  userSignup,
  userLogin,
  getCurrentUser,
  userLogout,
};
