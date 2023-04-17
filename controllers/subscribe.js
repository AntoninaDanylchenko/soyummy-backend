const nodemailer = require("nodemailer");

const newUser = require("../controllers/auth");

const emailTransport = nodemailer.createTransport({
  host: process.env.EMAIL_MAILTRAP_HOST,
  port: process.env.EMAIL_MAILTRAP_PORT,
  auth: {
    user: process.env.EMAIL_MAILTRAP_USERNAME,
    pass: process.env.EMAIL_MAILTRAP_PASSWORD,
  },
});

const emailConfig = {
  from: "So Yummy APP admin <soyummyadmin@op.pl>",
  to: newUser.email,
  subject: "Hello from So Yummy APP!",
  text: "nice to meet you",
};

emailTransport.sendMail(emailConfig);
