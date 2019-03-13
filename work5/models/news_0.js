const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient(config.dbURL, { useNewUrlParser: true });

function createNewsObj (newsInfo, userObj, newsId) {
  const newsObj = {};
  newsObj.id = newsId;
  newsObj.date = newsInfo.date;
  newsObj.text = newsInfo.text;
  newsObj.theme = newsInfo.theme;
  newsObj.userId = newsInfo.userId;
  newsObj.user = userObj;

  return newsObj;
}

module.exports.createNews = function (newsInfo, userObj) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(function (err, client) {
      if (err) {
        return reject(err);
      }
      // Подключаемся к базе данных
      const db = client.db();
      // Увеличиваем счетчик пользователей в коллекции counters
      db.collection('counters').findOneAndUpdate(
        { _id: 'newsid' },
        { $inc: { seq: 1 } },
        { returnOriginal: false },
        (err, newsCounter) => {
          if (err) {
            return reject(err);
          }
          const newsId = newsCounter.value.seq;
          const newNews = createNewsObj(newsInfo, userObj, newsId);

          db.collection('news').insertOne(newNews);
          client.close();
          resolve(newNews);
        });
    });
  });
};
