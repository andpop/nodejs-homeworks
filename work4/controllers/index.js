const skills = require('../models/skills');
const products = require('../models/products');
const nodemailer = require('nodemailer');
const config = require('../config');

module.exports.showMainPage = async (ctx, next) => {
  const renderVars = {
    mySkills: skills.get(),
    myProducts: products.get()
  };

  ctx.render('pages/index', renderVars);
};

module.exports.sendMessage = async function (ctx) {
  const { name, email, message } = ctx.request.body;
  if (!name.trim() || !email.trim() || !message.trim()) {
    // если что-либо не указано - сообщаем об этом
    ctx.body = { msg: 'Все поля нужно заполнить!', status: 'Error' };
  }

  // инициализируем модуль для отправки писем и указываем данные из конфига
  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text:
      message.trim().slice(0, 500) +
      `\n Отправлено с: <${email}>`
  };

  const sendMail = function (mailOptions) {
    return new Promise((resolve, reject) => {
      // отправляем почту
      transporter.sendMail(mailOptions, function (error, info) {
        // если есть ошибки при отправке - сообщаем об этом
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  };

  try {
    const info = await sendMail(mailOptions);
    ctx.body = { msg: 'Сообщение успешно отправлено!', status: 'Ok' };
  } catch (error) {
    ctx.body = {
      msg: `При отправке сообщения произошла ошибка!: ${error}`,
      status: 'Error'
    };
  }
};
