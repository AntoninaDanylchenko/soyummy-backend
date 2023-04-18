const nodemailer = require("nodemailer");
const { errorHandler } = require("../middlewares/errorHandler");

require("dotenv").config();

const config = {
  host: process.env.EMAIL_MAILTRAP_HOST,
  port: process.env.EMAIL_MAILTRAP_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_MAILTRAP_USERNAME,
    pass: process.env.EMAIL_MAILTRAP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);
const subscibeServis = async (email) => {
  const message = {
    to: email,
    // from: process.env.EMAIL_MAILTRAP_USERNAME,
    from: "So Yummy APP admin <soyummyadmin@op.pl>",
    subject: "Thank you for subscribe!",
    text: `You subscribed to the newsletter from the So Yummy in ${email}`,
    html: `You subscribed to the newsletter from the So Yummy in <strong>${email}</strong>`,
  };
  transporter
    .sendMail(message)
    .then((info) => {
      return info;
    })
    .catch((err) => errorHandler(err));
  return message;
};

// _initTransport() {
//   return nodemailer.createTestAccount({
//     service: "SendGrid",
//     auth: {
//       user: process.env.USERNAME_SENGRID,
//       pass: process.env.SENDGRID_PASSWORD,
//     },
//   });
// }
module.exports = { subscibeServis };
