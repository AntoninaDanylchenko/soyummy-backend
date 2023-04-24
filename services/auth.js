const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES,
} = process.env;

const assignTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES }
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES }
  );

  return { accessToken, refreshToken };
};

module.exports = { assignTokens };
