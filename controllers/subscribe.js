const sgMail = require("@sendgrid/mail");
const path = require("path");
const { convert } = require("html-to-text");
const pug = require("pug");

const { subscribeSchema } = require("../utils/joiSchemas/subscribeSchema");
const { HttpError } = require("../utils/HttpError");

const { SENDGRID_API_KEY, SENGRID_EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const subsribeMail = async (req, res) => {
  const { error } = subscribeSchema.validate(req.body);
  if (error) {

    throw new HttpError(error.status, error.message);

  }
  const html = pug.renderFile(
    path.join(__dirname, "..", "/", "template", "tplMail.pug")
  );
  const email = req.body.email;

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
  res.status(200).json("Email  is send");
};
module.exports = { subsribeMail };
