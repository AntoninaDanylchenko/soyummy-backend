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
const { updateUserProfile } = require("../../controllers/userProfile");

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

router.route("/logout").post(authMiddleware, userLogout);

module.exports = { authRouter: router };
