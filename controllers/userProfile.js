require("dotenv").config();
const { wrapper } = require("../middlewares/wrapper");
const { User } = require("../models/User");
const { HttpError } = require("../utils/HttpError");
// const path = require("path");
// const storeImage = path.join(process.cwd(), "avatars");
// const fs = require("fs").promises;

let updateUserProfile = async (req, res, next) => {
  const { _id } = req.user;
  try {
    let username = null;
    if (req.body.username) {
      username = req.body.username;
    }

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
    throw new HttpError(500, "Update error!");
  }
};
updateUserProfile = wrapper(updateUserProfile);

// let updateAvatar = async (req, res, next) => {
//   const { description } = req.body;
//   const { path: temporaryName, originalname } = req.file;
//   const fileName = path.join(storeImage, originalname);
//   try {
//     await fs.rename(temporaryName, fileName);
//   } catch (err) {
//     await fs.unlink(temporaryName);
//     return next(err);
//   }
//   res.json({ description, message: "Файл успешно загружен", status: 200 });
// };
// updateAvatar = wrapper(updateAvatar);

module.exports = {
  updateUserProfile,
  // updateAvatar,
};
