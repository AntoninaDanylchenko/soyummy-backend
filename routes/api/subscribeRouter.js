const express = require("express");
const { subsribeMail } = require("../../controllers/subscribe");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", subsribeMail);

module.exports = { subscribeRouter: router };
