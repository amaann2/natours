const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // TODO : create a transporter
  var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // TODO : define the email options
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // TODO : Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
