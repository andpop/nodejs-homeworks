const user = require('../models/user');
const news = require('../models/news');

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

module.exports.getAllNews = function (req, res) {
  news.getAllNews()
    .then(newsList => {
      res.json(newsList);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });
};

module.exports.saveNewNews = function (req, res) {
  const newNews = JSON.parse(req.body);
  user.getUserById(newNews.userId)
    .then(userObj => {
      return news.createNews(newNews, userObj);
    })
    .then(newsNews => {
      return news.getAllNews();
    })
    .then(newsList => {
      res.json(newsList);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });
};
