const nodemailer = require("nodemailer");
const { BOOLEAN } = require("sequelize");
const sendEmailConfiguration = (email, user, subject, text) => {
  const id = user?.id;
  if (!id) {
    return;
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NODE_MAILER_EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      throw new Error({ error });
    }
    console.log({ info });
  });
  const data = "Email sent";
  return data;
};

const verifyEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: BOOLEAN(process.env.SECURE),
      auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.NODE_MAILER_EMAIL,
      to: email,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        throw new Error({ error });
      }
      console.log({ info });
    });
    const data = "Email sent";
    return data;
  } catch (err) {
    console.log("email not sent!");
  }
};

module.exports = { sendEmailConfiguration, verifyEmail };
