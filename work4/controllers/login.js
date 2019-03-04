const user = require('../models/user');

// module.exports.showLoginForm = function (req, res) {
//   const flashMessageArray = req.flash('msglogin');
//   const renderVars = {};
//
//   if (flashMessageArray.length > 0) {
//     renderVars.msglogin = flashMessageArray[0];
//   }
//   if (req.session.email) {
//     renderVars.email = req.session.email;
//   }
//   res.render('pages/login', renderVars);
// };

module.exports.showLoginForm = async function (ctx) {
  const renderVars = {};

  if (ctx.session.msglogin) {
    renderVars.msglogin = ctx.session.msglogin;
    ctx.session.msglogin = '';
  }
  if (ctx.session.email) {
    renderVars.email = ctx.session.email;
  }
  ctx.render('pages/login', renderVars);
};

module.exports.authorization = async function (ctx) {
  const { email, password } = ctx.request.body;
  ctx.session.email = email;

  if (user.validate(email, password)) {
    ctx.session.isAdmin = true;
    ctx.redirect('/admin');
  } else {
    // req.flash('msglogin', 'Неправильный email или пароль');
    ctx.session.msglogin = 'Неправильный email или пароль';
    ctx.redirect('/login');
  }
};
