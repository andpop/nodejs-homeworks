const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/';

const mongoClient = new MongoClient(url, { useNewUrlParser: true });

mongoClient.connect(function (err, client) {

  if (err) {
    return console.log(err);
  }
  // взаимодействие с базой данных
  const db = client.db('klop');
  db
    .collection('cats')
    .find()
    .toArray((err, results) => {
      console.log(results);
    });
  client.close();
});

// mongoClient.connect(
//   url,
//   { useNewUrlParser: true },
//   (err, db) => {
//     if (err) {
//       return console.log(err);
//     }
//     db.db().collection('cats').find();
//     db.close();
//   });
