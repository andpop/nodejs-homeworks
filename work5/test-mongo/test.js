const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/loftsystem';

const user = {
  'id': 331,
  'username': 'andpop',
  'password': '$2a$10$qxJ1/xr5UeA2aeL6JMV8veL5Z8kHbJbvP8/3EHJpcAwOhMDZ5zMHi',
  'firstName': 'Андрей',
  'surName': 'Попов',
  'middleName': 'Владимирович',
  'permission': {
    'id': 331,
    'chat': {
      'id': 331,
      'C': false,
      'R': true,
      'U': true,
      'D': false,
      'updatedAt': '2019-03-10T17:12:59.090Z',
      'createdAt': '2019-03-10T17:12:59.090Z'
    },
    'news': {
      'id': 331,
      'C': false,
      'R': true,
      'U': false,
      'D': false,
      'updatedAt': '2019-03-10T17:12:59.091Z',
      'createdAt': '2019-03-10T17:12:59.091Z'
    },
    'setting': {
      '__id': 'bf1bb67e-9bcc-482c-a40e-afe6df671f2c',
      'id': 331,
      'C': false,
      'R': false,
      'U': false,
      'D': false,
      'updatedAt': '2019-03-10T17:12:59.092Z',
      'createdAt': '2019-03-10T17:12:59.092Z'
    },
    'updatedAt': '2019-03-10T17:12:59.088Z',
    'createdAt': '2019-03-10T17:12:59.088Z',
    'chatId': 331,
    'newsId': 331,
    'settingId': 331
  },
  'access_token': '855c03c0-19f0-4cc2-a444-dc5479f41600',
  'updatedAt': '2019-03-10T17:12:59.083Z',
  'createdAt': '2019-03-10T17:12:59.083Z',
  'permissionId': 331,
  'image': null
};

const mongoClient = new MongoClient(url, { useNewUrlParser: true });

mongoClient.connect(function (err, client) {
  if (err) {
    return console.log(err);
  }
  // взаимодействие с базой данных
  const db = client.db();

  db.collection('users').insertOne(user);

  // db
  //   .collection('cats')
  //   .find()
  //   .toArray((err, results) => {
  //     console.log(results);
  //   });
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
