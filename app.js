require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const { rootRoute } = require("./routes/api/index");

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/", rootRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = { app };
