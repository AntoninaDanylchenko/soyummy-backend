const { wrapper } = require("../middlewares/wrapper");
const { User } = require("../models/User");
const { HttpError } = require("../utils/HttpError");

let updateUserProfile = async (req, res, next) => {
  const { _id } = req.user;

  try {
    let username = null;
    if (req.body.username) {
      username = req.body.username;
    }

    // in postman filed add "avatar"
    let avatarURL = null;
    if (req.file) {
      avatarURL = req.file.path;
    }

    const updatedFields = {};

    if (username) {
      updatedFields.username = username;
    }
    if (avatarURL) {
      updatedFields.avatarURL = avatarURL;
    }

    const updatedUser = await User.findByIdAndUpdate(_id, updatedFields, {
      new: true,
    });

    res.status(200).json({ updatedUser });
  } catch (error) {
    throw new HttpError(
      500,
      "There is no content to update! Please, add new username or avatar!"
    );
  }
};
updateUserProfile = wrapper(updateUserProfile);

module.exports = {
  updateUserProfile,
};
