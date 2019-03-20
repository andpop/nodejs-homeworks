// const config = require('../config');
const mongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const lib = require('../lib');

require('dotenv').config();
const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/loftsystem';

function setPermissions (userRegisterInfo, userId) {
  const permissions = {};
  permissions.id = userId;
  for (let category in userRegisterInfo.permission) {
    permissions[category] = {};
    permissions[category]['id'] = userId;
    for (let permission in userRegisterInfo.permission[category]) {
      permissions[category][permission] = userRegisterInfo['permission'][category][permission];
    }
  }
  return permissions;
}

function setAdminPermissions (userRegisterInfo, userId) {
  const permissions = {};
  permissions.id = userId;
  permissions.chat = {
    'id': userId,
    'C': true,
    'R': true,
    'U': true,
    'D': true
  };
  permissions.news = {
    'id': userId,
    'C': true,
    'R': true,
    'U': true,
    'D': true
  };
  permissions.setting = {
    'id': userId,
    'C': true,
    'R': true,
    'U': true,
    'D': true
  };
  return permissions;
}

function createUserObj (userRegisterInfo, userId) {
  const userObj = {};
  userObj.id = userId;
  userObj.access_token = lib.generateAccessToken(userId);
  userObj.password = lib.hashPassword(userRegisterInfo.password);
  userObj.username = userRegisterInfo.username;
  userObj.firstName = userRegisterInfo.firstName;
  userObj.middleName = userRegisterInfo.middleName;
  userObj.surName = userRegisterInfo.surName;
  userObj.img = userRegisterInfo.img;
  userObj.permissionId = userObj.id;
  userObj.permission = setPermissions(userRegisterInfo, userId);

  return userObj;
}

module.exports.getAll = function () {
  return new Promise((resolve, reject) => {
    mongoClient.connect(dbUri, { useNewUrlParser: true }, function (err, client) {
      if (err) {
        return reject(err);
      }
      const db = client.db();
      db.collection('users').find({}).toArray((err, results) => {
        if (err) {
          return reject(err);
        }
        client.close();
        resolve(results);
      });
    });
  });
};

module.exports.create = function (userRegisterInfo) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(dbUri, { useNewUrlParser: true }, function (err, client) {
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

module.exports.getByUsername = function (username) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(dbUri, { useNewUrlParser: true }, function (err, client) {
      if (err) {
        return reject(err);
      }
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

module.exports.getById = function (id) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(dbUri, { useNewUrlParser: true }, function (err, client) {
      if (err) {
        console.error(err);
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

module.exports.updatePermissions = function (permissionId, changedPermissions) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(dbUri, { useNewUrlParser: true }, function (err, client) {
      if (err) {
        console.error(err);
        return reject(err);
      }
      // Подключаемся к базе данных
      const db = client.db();

      const changedFields = {};
      for (let fieldPath in changedPermissions) {
        changedFields[fieldPath] = changedPermissions[fieldPath];
      }

      db.collection('users').findOneAndUpdate(
        { 'permissionId': permissionId },
        { $set: changedFields },
        { returnOriginal: false },
        (err, updatedUser) => {
          if (err) {
            return reject(err);
          }
          client.close();
          resolve(updatedUser);
        });
    });
  });
};

module.exports.updateInfo = function (userInfo) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(dbUri, { useNewUrlParser: true }, function (err, client) {
      if (err) {
        console.error(err);
        return reject(err);
      }
      // Подключаемся к базе данных
      const db = client.db();

      const changedFields = {};
      for (let field in userInfo) {
        if (field !== 'oldPassword' && field !== 'password') {
          changedFields[field] = userInfo[field];
        }
        // TODO Добавить проверку совпадения hashPassword(userInfo.oldPassword) с полем password из записи о пользователе
        if (field === 'password') {
          changedFields.password = lib.hashPassword(userInfo.password);
        }
      }

      db.collection('users').findOneAndUpdate(
        { 'id': userInfo.id },
        { $set: changedFields },
        { returnOriginal: false },
        (err, updatedUser) => {
          if (err) {
            return reject(err);
          }
          client.close();
          resolve(updatedUser.value);
        });
    });
  });
};

module.exports.saveImage = function (req) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    const userId = req.params.id;
    const uploadDir = path.join('./public', 'upload', userId);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    form.uploadDir = path.join(process.cwd(), uploadDir);
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.error(err.message);
        return reject(err);
      }
      const fileName = path.join(uploadDir, files[userId].name);
      fs.rename(files[userId].path, fileName, function (err) {
        if (err) {
          console.error(err.message);
          return reject(err);
        }
        resolve({ 'path': path.join('upload', userId, files[userId].name) });
      });
    });
  });
};

module.exports.deleteById = function (userId) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(dbUri, { useNewUrlParser: true }, function (err, client) {
      if (err) {
        return reject(err);
      }
      const db = client.db();
      db.collection('users').deleteOne(
        { id: +userId },
        (err, result) => {
          if (err) {
            return reject(err);
          }
          client.close();
          if (result.result.n === 0) {
            resolve(null);
          } else {
            resolve({ result: 'The user was deleted.' });
          }
        });
    });
  });
};
