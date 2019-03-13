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
  user.getUserByUsername(account.username)
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
};

module.exports.saveNewNews = function (req, res) {
  //TODO Нужно возвращать массив всех новостей
  const newNews = JSON.parse(req.body);
  user.getUserById(newNews.userId)
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

  // console.log(newNews.userId);
  // res.json({});
};
