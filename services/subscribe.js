const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY, SENGRID_EMAIL_FROM } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);
const path = require("path");
const { convert } = require("html-to-text");
const pug = require("pug");

const sendMail = async ({ email }) => {
  const html = pug.renderFile(
    path.join(__dirname, "..", "/", "template", "tplMail.pug")
  );
  const emailTpl = {
    to: email,
    from: SENGRID_EMAIL_FROM,
    subject: "Subscription info",
    html: html,
    text: convert(html),
  };
  await sgMail
    .send(emailTpl)
    .then(() => console.log("send email success"))
    .catch((error) => {
      console.log(error.message);
    });
};
module.exports = { sendMail };
