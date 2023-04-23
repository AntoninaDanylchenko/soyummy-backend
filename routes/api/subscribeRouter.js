const express = require("express");
const { subsribeMail } = require("../../controllers/subscribe");

const router = express.Router();

router.get("/", subsribeMail);

module.exports = { subscribeRouter: router };
