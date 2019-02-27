const user = require('../models/user');

module.exports.showLoginForm = function (req, res) {
  console.log(req.flash('msg1')[0]);
  res.render('pages/login');
};

module.exports.authorization = function (req, res) {
  console.log('POST /login');
  const { email, password } = req.body;

  if (user.validate(email, password)) {
    req.session.isAdmin = true;
    res.redirect('/admin');
  } else {
    req.flash('msg1', 'Flash message');
    res.redirect('/login');
  }
};
