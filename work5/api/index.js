const user = require('../models/user');
const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoClient = new MongoClient(config.dbURL, { useNewUrlParser: true });

module.exports.saveNewUser = function (req, res) {
  // TODO Сделать проверку входных данных
  // TODO Сделать сохранение пользователя в MongoDB

  const newUser = JSON.parse(req.body);
  const responseUser = user.createUser(newUser);
  mongoClient.connect(function (err, client) {
    if (err) {
      return console.log(err);
    }
    // взаимодействие с базой данных
    const db = client.db();

    db.collection('users').insertOne(responseUser);
    res.json(responseUser);
    client.close();
  });
};
