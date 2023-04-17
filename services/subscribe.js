const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `So Yummy Admin <${process.env.EMAIL_FROM}>`;
  }

  _initTransport() {
    return nodemailer.createTestAccount({
      service: "SendGrid",
      auth: {
        user: process.env.USERNAME_SENGRID,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  async _send() {}
};
