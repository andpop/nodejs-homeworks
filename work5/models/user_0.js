const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;
/*
const mongoClient = new MongoClient(config.dbURL, {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  autoReconnect: true
});
*/
const mongoClient = new MongoClient(config.dbURL, {
  useNewUrlParser: true
});
const bcrypt = require('bcryptjs');

// var settings = {
//   reconnectTries : Number.MAX_VALUE,
//   autoReconnect : true
// };

// TODO Сделать генерацию токена
function getAccessToken () {
  return '855c03c0-19f0-4cc2-a444-dc5479f41600';
}

function hashPassword (password) {
  // let hash = '$2a$10$qxJ1/xr5UeA2aeL6JMV8veL5Z8kHbJbvP8/3EHJpcAwOhMDZ5zMHi';
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function getPermission (userId) {
  const permissions = {};
  permissions.id = userId;
  permissions.chat = {
    'id': userId,
    'C': false,
    'R': true,
    'U': true,
    'D': false
  };
  // permissions.news = {
  //   'id': userId,
  //   'C': false,
  //   'R': true,
  //   'U': true,
  //   'D': false
  // };
  permissions.news = {
    'id': userId,
    'C': true,
    'R': true,
    'U': true,
    'D': true
  };
  permissions.setting = {
    'id': userId,
    'C': false,
    'R': true,
    'U': true,
    'D': false
  };

  return permissions;
}

function createUserObj (userRegisterInfo, userId) {
  const userObj = {};
  userObj.id = userId;
  userObj.access_token = getAccessToken();
  userObj.password = hashPassword(userRegisterInfo.password);
  userObj.username = userRegisterInfo.username;
  userObj.firstName = userRegisterInfo.firstName;
  userObj.middleName = userRegisterInfo.middleName;
  userObj.surName = userRegisterInfo.surName;
  userObj.img = userRegisterInfo.img;
  userObj.permissionId = userObj.id;
  userObj.permission = getPermission(userObj.id);

  return userObj;
}

module.exports.createUser = function (userRegisterInfo) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(function (err, client) {
      if (err) {
        return reject(err);
      }
      // Подключаемся к базе данных
      const db = client.db();

      // Увеличиваем счетчик пользователей в коллекции counters
      db.collection('counters').findOneAndUpdate(
        { _id: 'userid' },
        { $inc: { seq: 1 } },
        { returnOriginal: false },
        (err, userCounter) => {
          if (err) {
            return reject(err);
          }
          const userId = userCounter.value.seq;
          const newUser = createUserObj(userRegisterInfo, userId);

          db.collection('users').insertOne(newUser);
          client.close();
          resolve(newUser);
        });
    });
  });
};

module.exports.getUserByUsername = function (username) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(function (err, client) {
      if (err) {
        return reject(err);
      }
      // Подключаемся к базе данных
      const db = client.db();

      let userObj = db.collection('users').findOne({ 'username': username });
      client.close();
      if (userObj) {
        resolve(userObj);
      } else {
        resolve(null);
      }
    });
  });
};

module.exports.getUserById = function (id) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(function (err, client) {
      // console.log(2222222);
      if (err) {
        console.log(err);
        return reject(err);
      }
      // Подключаемся к базе данных
      const db = client.db();

      let userObj = db.collection('users').findOne({ 'id': id });

      client.close();
      if (userObj) {
        resolve(userObj);
      } else {
        resolve(null);
      }
    });
  });
};
