const user = require('../models/user');
const news = require('../models/news');

module.exports.getAllUsers = function (req, res) {
  user.getAllUsers()
    .then(newsList => {
      res.json(newsList);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });

};

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
    .then(savedNews => {
      return news.getAllNews();
    })
    .then(newsList => {
      res.json(newsList);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });
};

module.exports.updateNews = function (req, res) {
  // console.log(req.params.id);
  const newNews = JSON.parse(req.body);
  user.getUserById(newNews.userId)
    .then(userObj => {
      return news.updateNews(newNews, userObj);
    })
    .then(updatedNews => {
      return news.getAllNews();
    })
    .then(newsList => {
      res.json(newsList);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });
};

module.exports.deleteNews = function (req, res) {
  const newsId = req.params.id;
  news.deleteNewsById(newsId)
    .then(result => {
      return news.getAllNews();
    })
    .then(newsList => {
      res.json(newsList);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });
};
