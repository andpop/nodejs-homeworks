const user = require('../models/user');

module.exports.showLoginForm = function (req, res) {
  const flashMessageArray = req.flash('msglogin');
  const renderVars = {};

  if (flashMessageArray.length > 0) {
    renderVars.msglogin = flashMessageArray[0];
  }
  if (req.session.email) {
    renderVars.email = req.session.email;
  }
  res.render('pages/login', renderVars);
};

module.exports.authorization = function (req, res) {
  const { email, password } = req.body;
  req.session.email = email;

  if (user.validate(email, password)) {
    req.session.isAdmin = true;
    res.redirect('/admin');
  } else {
    req.flash('msglogin', 'Неправильный email или пароль');
    res.redirect('/login');
  }
};
