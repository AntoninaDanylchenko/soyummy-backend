const subscribeSchema = require("../utils/joiSchemas/subscribeSchema");

const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const subscribeMail = async (req, res) => {
  const { error } = subscribeSchema.validate(req.body);
  if (error) {
    return res.status(404).json({ message: error.message });
  }
  const { email } = req.user;
  const { putEmail } = req.body;
  if (email !== putEmail) {
    return res.status(404).json({
      message: "Please input your email for which you are registered",
    });
  }
  const emailForSend = {
    to: email,
    from: "soyummyadmin@op.pl",
    subject: "Subscription info",
    html: "<p>You subscribed to our news!</p>",
  };

  await sgMail
    .send(emailForSend)
    .then(() => console.log("Email send success"))
    .catch((error) => {
      console.log(error.message);
      return res.status(404).json({ message: error });
    });
  res.status(200).json({
    status: 200,
    message: "success",
  });
};
module.exports = { subscribeMail };
