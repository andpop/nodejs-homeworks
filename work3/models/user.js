const psw = require('../libs/password');
const db = require('./db');

module.exports.validate = function (email, password) {
  const user = db.get('user').value();
  return (user.email === email && psw.validPassword(password));
};
