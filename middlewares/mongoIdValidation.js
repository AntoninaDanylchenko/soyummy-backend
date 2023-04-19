const mongoose = require("mongoose");
const { HttpError } = require("../utils/HttpError");

function mongoIdValidation(req, res, next) {
  if (req.params.id) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw new HttpError(400, "Invalid ID");
    }
  }
  if (req.body.id) {
    if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
      throw new HttpError(400, "Invalid ID");
    }
  }
  next();
}

module.exports = { mongoIdValidation };
