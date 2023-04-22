const express = require("express");
const { subsribeMail } = require("../../controllers/subscribe");

const router = express.Router();

router.post("/", subsribeMail);

module.exports = { subscribeRouter: router };
