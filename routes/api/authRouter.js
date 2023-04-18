const express = require("express");
const { userSignup, userLogin, userLogout } = require("../../controllers/auth");
const { validateBody } = require("../../middlewares/validateBody");
const {
  joiRegisterSchema,
  joiLoginSchema,
} = require("../../utils/joiSchemas/userJoiSchema");
const { uploadCloud } = require("../../middlewares/uploadMiddleware");

const router = express.Router();

router
  .route("/signup")
  .post(
    validateBody(joiRegisterSchema),
    uploadCloud.single("avatar"),
    userSignup
  );
router.route("/login").post(validateBody(joiLoginSchema), userLogin);
router.route("/logout").post(userLogout);

module.exports = { authRouter: router };
