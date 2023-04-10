const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email.username,
    pass: config.email.password,
  },
});

module.exports = transporter;
