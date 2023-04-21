const jwt = require("jsonwebtoken");

const { User } = require("../models/User");
const { HttpError } = require("../utils/HttpError");
const { assignTokens } = require("../services/auth");
require("dotenv").config();
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  let token;
  try {
    // const [, headerToken] = req.headers["authorization"].split(" ");
    const [, headerToken] = req.headers.authorization.split(" ");

    token = headerToken;
  } catch (error) {
    return next(new HttpError(401, "Not authorized"));
  }
  let user;
  try {
    const { id } = jwt.decode(token);
    user = await User.findById(id);
    if (!user || !user.refresh_token) {
      return next(new HttpError(401, "Not authorized"));
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      try {
        jwt.verify(token, REFRESH_TOKEN_SECRET); // якщо рефреш токен ОК
        const { accessToken, refreshToken } = assignTokens(user); // викликаємо фнкцію яка створює нову пару токенів
        await User.findByIdAndUpdate(user._id, { refresh_token: refreshToken }); // оновлюємо поле рефреш токена в базі даних
        res.status(200).json({ accessToken }); // в респонсі повертаємо аксес
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          return next(new HttpError(401, "Token expired, please Login again."));
        }
        return next(new HttpError(401, "Invalid token"));
      }
    }
    next(error);
  }
};

module.exports = {
  authMiddleware,
};

// const jwt = require("jsonwebtoken");
// const { User } = require("../models/User");
// const { HttpError } = require("../utils/HttpError");
// const { assignTokens } = require("../services/auth");
// require("dotenv").config();
// const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

// const authMiddleware = async (req, res, next) => {
//   let token;
//   try {
//     const { authorization } = req.headers;
//     // const [, headerToken] = req.headers["authorization"].split(" ");
//     const [, headerToken] = authorization.split(" ");
//     token = headerToken;
//   } catch (error) {
//     return next(new HttpError(401, "Not authorized"));
//   }
//   let user;
//   try {
//     const { id } = jwt.decode(token);
//     user = await User.findById(id);
//     if (!user || !user.refresh_token) {
//       return next(new HttpError(401, "Not authorized"));
//     }

//     jwt.verify(token, ACCESS_TOKEN_SECRET);
//     req.user = user;

//     next();
//   } catch (error) {
//     if (error instanceof jwt.TokenExpiredError) {
//       try {
//         jwt.verify(token, REFRESH_TOKEN_SECRET);
//         const { accessToken, refreshToken } = assignTokens(user);
//         await User.findByIdAndUpdate(user._id, { refresh_token: refreshToken });
//         res.status(200).json({ accessToken });
//       } catch (error) {
//         if (error instanceof jwt.REFRESH_TOKEN_SECRET) {
//           return next(new HttpError(401, "Token expired, please Login again."));
//         }
//         return next(new HttpError(401, "Invalid token"));
//       }
//     }
//     next(error);
//   }
// };

// module.exports = {
//   authMiddleware,
// };
