const nodemailer = require("nodemailer");

const emailTransport = nodemailer.createTransport({});

const emailConfig = {
  from: "So Yummy APP admin <soyummyadmin@op.pl>",
  to: newUser.email,
  subject: "Hello from So Yummy APP!",
  text: "nice to meet you1",
};

await emailTransport.sendMail(emailConfig);
