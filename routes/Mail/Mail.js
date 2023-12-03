const { sendMail } = require("../../mail/mail");
const express = require("express");
const MailRoute = express.Router();

MailRoute.get("/send", sendMail);

module.exports = MailRoute;
