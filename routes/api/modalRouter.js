const express = require("express");
const { getInfoAboutUser } = require("../../controllers/modal");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getInfoAboutUser);

module.exports = { modalRouter: router };
