// const { wrapper } = require("../middlewares/wrapper");
// const gravatar = require("gravatar");
// // const path = require("path");
// require("dotenv").config();

// const { assignTokens } = require("../services/auth");
// const { User } = require("../models/User");
// const { HttpError } = require("../utils/HttpError");

// let userSignup = async (req, res, next) => {
//   const { email, password, username } = req.body;
//   const isEmailUnique = await User.findOne({ email });
//   if (isEmailUnique) {
//     throw new HttpError(409, "Email should be unique");
//   }

//   const avatarURL = gravatar.url(email);
//   // avatarURL: req.file.path;
//   const newUser = await User.create({ username, email, password, avatarURL });
//   newUser.password = undefined;
//   res.status(201).json(newUser);
// };
// userSignup = wrapper(userSignup);

// let userLogin = async (req, res, next) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new HttpError(401, "Email or password is incorrect");
//   }

//   const isPasswordCorrect = user.isPasswordCorrect(password);
//   if (!isPasswordCorrect) {
//     throw new HttpError(401, "Email or password is incorrect");
//   }

//   const { accessToken, refreshToken } = assignTokens(user);
//   await User.findByIdAndUpdate(user._id, { refresh_token: refreshToken });
//   user.password = undefined;
//   res.json({ user, token: accessToken });
// };
// userLogin = wrapper(userLogin);

// let userLogout = async (req, res, next) => {};
// userLogout = wrapper(userLogout);

// module.exports = { userSignup, userLogin, userLogout };

const gravatar = require("gravatar");
// const path = require("path");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const { wrapper } = require("../middlewares/wrapper");

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

  // const { accessToken } = assignTokens(req.body);

  const newUser = await User.create({
    username,
    email,
    password,
    avatarURL,
    // refresh_token: accessToken,
  });
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

  // const isPasswordCorrect = await user.isPasswordCorrect({ password });
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  // return isPasswordCorrect;

  if (!isPasswordCorrect) {
    throw new HttpError(401, "Email or password is incorrect");
  }

  const { accessToken, refreshToken } = assignTokens(user);

  await User.findByIdAndUpdate(user._id, { refresh_token: refreshToken });
  user.password = undefined;

  res.json({ user, token: accessToken });
};
userLogin = wrapper(userLogin);

let getCurrentUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};
getCurrentUser = wrapper(getCurrentUser);

// let updateUser = async (req, res) => {};

// updateUser = wrapper(updateUser);

let userLogout = async (req, res, _) => {
  // const {} = req.user;
  // eslint-disable-next-line camelcase
  const { _id, refresh_token } = req.user;
  const user = await User.findOne({ refresh_token });
  // const user = await User.findById(_id);
 
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
  // updateUser,
  userLogout,
};
