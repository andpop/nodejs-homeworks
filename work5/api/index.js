const user = require('../models/user');

module.exports.saveNewUser = function (req, res) {
  // TODO Сделать проверку входных данных

  const newUser = JSON.parse(req.body);
  user.createUser(newUser)
    .then(responseUser => {
      res.json(responseUser);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });
};

module.exports.login = function (req, res) {
  const account = JSON.parse(req.body);
  user.loadUser(account.username)
    .then(userObj => {
      if (userObj) {
        res.json(userObj);
      } else {
        res.status(401).json({ err: 'Неправильное имя пользователя или пароль' });
      }
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });

  // console.log(account.username, account.password);
  // res.json(account);
};
