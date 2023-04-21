const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY, SENGRID_EMAIL_FROM } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);
const path = require("path");
const { convert } = require("html-to-text");
const pug = require("pug");
const { subscribeSchema } = require("../utils/joiSchemas/subscribeSchema");
const { HttError } = require("../utils/HttpError");

const subsribeMail = async (req, res) => {
  const { error } = subscribeSchema.validate(req.body);
  if (error) {
    throw new HttError();
  }
  const html = pug.renderFile(
    path.join(__dirname, "..", "/", "template", "tplMail.pug")
  );
  const email = req.user;
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
module.exports = { subsribeMail };
