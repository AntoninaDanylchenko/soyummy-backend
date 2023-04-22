const express = require("express");
const { getInfoAboutUser } = require("../../controllers/modal");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getInfoAboutUser);

module.exports = { modalRouter: router };
