const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');

module.exports.hashPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

module.exports.validPassword = function (password, hash) {
  return bcrypt.compareSync(password, hash);
};

module.exports.generateAccessToken = function (userId) {
  const secret = require('../config').secret;
  const payload = {
    id: userId
  };
  return jwt.encode(payload, secret);
  // return '855c03c0-19f0-4cc2-a444-dc5479f41600';
};
