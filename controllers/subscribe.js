const { errorHandler } = require("../middlewares/errorHandler");
const { subscibeServis } = require("../services/subscribe");
const {
  subscribeValidate,
} = require("../utils/joiSchemas/subscribeValidateShema");

const subscribeController = async (req, res, next) => {
  const reqValidate = subscribeValidate.validate(req.body);
  const { email } = req.body;
  if (!reqValidate.error) {
    const res = await subscibeServis(email);
    if (res) {
      return res.status(200).json({
        message: `succesfull subscribe to ${email}`,
        code: 200,
      });
    } else {
      throw errorHandler("Internal server error!");
    }
  }
};
module.exports = { subscribeController };
// const nodemailer = require("nodemailer")

// const emailTransport = nodemailer.createTransport({
//   host: process.env.EMAIL_MAILTRAP_HOST,
//   port: process.env.EMAIL_MAILTRAP_PORT,
//   auth: {
//     user: process.env.EMAIL_MAILTRAP_USERNAME,
//     pass: process.env.EMAIL_MAILTRAP_PASSWORD,
//   },
// });

// const emailConfig = {
//   from: "So Yummy APP admin <soyummyadmin@op.pl>",
//   to: newUser.email,
//   subject: "Hello from So Yummy APP!",
//   text: "nice to meet you",
// };

// emailTransport.sendMail(emailConfig);
