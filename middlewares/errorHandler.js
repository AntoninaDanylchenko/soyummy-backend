const errorHandler = (error, req, res, next) => {
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "something went wrong, try again" });
};

module.exports = { errorHandler };
