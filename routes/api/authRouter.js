const express = require("express");
const { validateBody } = require("../../middlewares/validateBody");
const { uploadCloud } = require("../../middlewares/uploadMiddleware");

const {
  joiRegisterSchema,
  joiLoginSchema,
} = require("../../utils/joiSchemas/userJoiSchema");

const {
  userSignup,
  userLogin,
  userLogout,
  getCurrentUser,
} = require("../../controllers/auth");
const { authMiddleware } = require("../../middlewares/authMiddleware");

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

router.route("/logout").post(authMiddleware, userLogout);

module.exports = { authRouter: router };
