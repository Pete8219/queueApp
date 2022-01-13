const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
  const { email } = req.body;
  const output = `
    <p>Электронная очередь<p>
    <h3>Подтверждение учетной записи пользователя<h3>
    <p>Данное письмо содержит ссылку для активации вашей учетной записи в системе "Электронная очередь". После активации Вы сможете зайти в систему как зарегистрированный пользователь и записаться на прием по интересующему Вас вопросу.</p>
    <p>Ссылка для активации вашей учетной записи: ${
      process.env.API_SERVER
    }/confirm/${email}/${uuidv4()}</p>
    
  `;

  // скрипт от правки письма получателю
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Электронная очередь" <itu@salekhard.org>', // sender address
      to: email, // list of receivers
      subject: "Активация учетной записи", // Subject line
      html: output, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (e) {
    console.log(e);
  }
};
