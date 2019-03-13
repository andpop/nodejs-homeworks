const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient(config.dbURL, { useNewUrlParser: true });

module.exports.createNews = function (newsInfo) {

};
