const { wrapper } = require("../middlewares/wrapper");

let singup = async (req, res, next) => {};
singup = wrapper(singup);

let login = async (req, res, next) => {};
login = wrapper(login);

let logout = async (req, res, next) => {};
logout = wrapper(logout);

module.exports = {
  singup,
  login,
  logout,
};
