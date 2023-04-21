class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
module.exports = { HttpError };

// class HttpError extends Error {
//   constructor(status, message) {
//     super(message);
//     this.status = status;
//   }
// }
// module.exports = HttpError;
