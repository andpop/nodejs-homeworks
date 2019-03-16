const isLocalDB = true;

const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const dbUrl = isLocalDB ? config.dbURL : 'mongodb+srv://andpop-user:sgYHgLhyeoHiFfOX@andpop-lrdsm.mongodb.net/loftsystem?retryWrites=true';

const mongoClient = new MongoClient(dbUrl, { useNewUrlParser: true });

mongoClient.connect(function (err, client) {
  if (err) {
    console.log(err);
  }
  const db = client.db();
  let ret = db.collection('counters').insertOne(
    {
      _id: 'userid',
      seq: 0
    }
  );
  console.log(ret);
  ret = db.collection('counters').insertOne(
    {
      _id: 'newsid',
      seq: 0
    }
  );
  console.log(ret);
  client.close();
});
