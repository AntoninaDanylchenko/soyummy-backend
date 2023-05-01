const sgMail = require("@sendgrid/mail");
const path = require("path");
const { convert } = require("html-to-text");
const pug = require("pug");

const { SENDGRID_API_KEY, SENGRID_EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const subsribeMail = async (req, res) => {
  const { email } = req.body;

  const html = pug.renderFile(
    path.join(__dirname, "..", "/", "template", "tplMail.pug")
  );

  const emailTpl = {
    to: email,
    from: SENGRID_EMAIL_FROM,
    subject:
      "Thank you for your subscription to the news So Yummy. Be the first to receive the newest recipes!",
    html: html,
    text: convert(html),
  };
  await sgMail
    .send(emailTpl)
    .then(() => console.log("send email success"))
    .catch((error) => {
      console.log(error.message);
    });
  res.status(200).json({
    message: "A message has been sent to this email. Check your mail.",
  });
};
module.exports = { subsribeMail };
