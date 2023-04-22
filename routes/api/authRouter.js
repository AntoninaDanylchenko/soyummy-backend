const express = require("express");
const { validateBody } = require("../../middlewares/validateBody");
const { uploadCloud } = require("../../middlewares/uploadMiddleware");

const {
  joiRegisterSchema,
  joiLoginSchema,
  joiUserSchema,
} = require("../../utils/joiSchemas/userJoiSchema");

const {
  userSignup,
  userLogin,
  userLogout,
  getCurrentUser,
} = require("../../controllers/auth");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  updateUserProfile,
  updateAvatar,
} = require("../../controllers/userProfile");

const router = express.Router();

router
  .route("/signup")
  .post(
    validateBody(joiRegisterSchema),
    uploadCloud.single("avatar"),
    userSignup
  );
router.route("/login").post(validateBody(joiLoginSchema), userLogin);

router.route("/current").get(authMiddleware, getCurrentUser);
router
  .route("/user")
  .patch(
    authMiddleware,
    validateBody(joiUserSchema),
    uploadCloud.single("avatar"),
    updateUserProfile
  );

router
  .route("/upload")
  .post(
    authMiddleware,
    uploadCloud.single("avatar"),
    async (req, res, next) => {
      const { description } = req.body;
      console.log(req.body);
      const { path: temporaryName, originalname } = req.file;
      const fileName = path.join(storeImage, originalname);
      try {
        await fs.rename(temporaryName, fileName);
      } catch (err) {
        await fs.unlink(temporaryName);
        return next(err);
      }
      res.json({ description, message: "Файл успешно загружен", status: 200 });
    }
  );

router.route("/logout").post(authMiddleware, userLogout);

module.exports = { authRouter: router };
