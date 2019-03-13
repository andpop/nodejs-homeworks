const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient(config.dbURL, { useNewUrlParser: true });

mongoClient.connect(function (err, client) {
  if (err) {
    console.log(err);
  }
  const db = client.db();
  let ret = db.collection('counters').insertOne(
    {
      _id: "userid",
      seq: 0
    }
  );
  console.log(ret);
  client.close();
});
