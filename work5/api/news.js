const news = require('../models/news');
const user = require('../models/user');

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
  user.getById(newNews.userId)
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
  user.getById(newNews.userId)
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
