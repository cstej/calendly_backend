const nodemailer = require("nodemailer");

//
const transporter = nodemailer.createTransport({
  service: "smtp-relay.sendinblue.com",
  auth: {
    user: "katillboyy@gmail.com",
    pass: "xYzBs7fO8LJ6g01m",
  },
});

const sendMail = async (req, res) => {
  const to = "arun07744@gmail.com";
  const subject = "katillboyy is sending you mail";
  const text = "it's good to be bad";

  const mailOptions = {
    from: "katillboyy@gmail.com",
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email." });
  }
};

module.exports = { sendMail };
