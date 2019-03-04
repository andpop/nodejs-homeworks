const skills = require('../models/skills');
const products = require('../models/products');
const nodemailer = require('nodemailer');
const config = require('../config');

// module.exports.showMainPage = function (req, res) {
//   const renderVars = {
//     mySkills: skills.get(),
//     myProducts: products.get()
//   };
//
//   res.render('pages/index', renderVars);
// };

module.exports.showMainPage = async (ctx, next) => {
  const renderVars = {
    mySkills: skills.get(),
    myProducts: products.get()
  };

  ctx.render('pages/index', renderVars);
};

module.exports.sendMessage = function (req, res) {
  if (!req.body.name || !req.body.email || !req.body.message) {
    // если что-либо не указано - сообщаем об этом
    return res.json({ msg: 'Все поля нужно заполнить!', status: 'Error' });
  }

  // инициализируем модуль для отправки писем и указываем данные из конфига
  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text:
      req.body.message.trim().slice(0, 500) +
      `\n Отправлено с: <${req.body.email}>`
  };
  // отправляем почту
  transporter.sendMail(mailOptions, function (error, info) {
    // если есть ошибки при отправке - сообщаем об этом
    if (error) {
      return res.json({
        msg: `При отправке сообщения произошла ошибка!: ${error}`,
        status: 'Error'
      });
    }
    res.json({ msg: 'Сообщение успешно отправлено!', status: 'Ok' });
  });
};
