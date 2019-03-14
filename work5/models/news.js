const config = require('../config');
const mongoClient = require('mongodb').MongoClient;

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

module.exports.getAllNews = function () {
  return new Promise((resolve, reject) => {
    mongoClient.connect(config.dbURL, { useNewUrlParser: true }, function (err, client) {
      if (err) {
        return reject(err);
      }
      const db = client.db();
      db.collection('news').find({}).toArray((err, results) => {
        if (err) {
          return reject(err);
        }
        client.close();
        resolve(results);
      });
    });
  });
};

module.exports.createNews = function (newsInfo, userObj) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(config.dbURL, { useNewUrlParser: true }, function (err, client) {
      if (err) {
        return reject(err);
      }
      const db = client.db();
      // Увеличиваем счетчик новостей в коллекции counters
      db.collection('counters').findOneAndUpdate(
        { _id: 'newsid' },
        { $inc: { seq: 1 } },
        { returnOriginal: false },
        (err, newsCounter) => {
          if (err) {
            return reject(err);
          }
          const newsId = newsCounter.value.seq;
          console.log(newsId);
          const newNews = createNewsObj(newsInfo, userObj, newsId);

          db.collection('news').insertOne(newNews);
          client.close();
          resolve(newNews);
        });
    });
  });
};

module.exports.updateNews = function (newsInfo, userObj) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(config.dbURL, { useNewUrlParser: true }, function (err, client) {
      if (err) {
        return reject(err);
      }
      const db = client.db();
      const changedFields = {
        'date': newsInfo.date,
        'text': newsInfo.text,
        'theme': newsInfo.theme,
        'userId': newsInfo.userId,
        'user': userObj
      };

      db.collection('news').findOneAndUpdate(
        { id: newsInfo.id },
        { $set: changedFields },
        { returnOriginal: false },
        (err, updatedNews) => {
          if (err) {
            return reject(err);
          }
          client.close();
          resolve(updatedNews);
        });
    });
  });
};

module.exports.deleteNewsById = function (newsId) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(config.dbURL, { useNewUrlParser: true }, function (err, client) {
      if (err) {
        return reject(err);
      }
      const db = client.db();
      db.collection('news').deleteOne(
        { id: +newsId },
        (err, result) => {
          if (err) {
            return reject(err);
          }
          client.close();
          if (result.result.n === 0) {
            resolve(null);
          } else {
            resolve({ result: 'The news was deleted.' });
          }
        });
    });
  });
};
