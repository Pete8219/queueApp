const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { v: uuidv4 } = require("uuid");
dotenv.config();

class MailService {
  constructor() {
    this.tranporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    });
  }

  async sendActivationLink(to, password, link) {
    const output = `
    <p>Электронная очередь<p>
    <h3>Подтверждение учетной записи пользователя<h3>
    <p>Данное письмо содержит ссылку для активации вашей учетной записи в системе "Электронная очередь". После активации Вы сможете зайти в систему как зарегистрированный пользователь и записаться на прием по интересующему Вас вопросу.</p>
    <p>Ваш логин: ${to}</p>
    <p>Ваш пароль: ${password}</p>
    </br>
    <p>Ссылка для активации вашей учетной записи: ${link}</p>
    
  `;

    try {
      await this.tranporter.sendMail({
        from: '"Электронная очередь" <itu@salekhard.org>', // sender address
        to: to, // list of receivers
        subject: "Активация учетной записи", // Subject line
        html: output, // html body
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MailService();
