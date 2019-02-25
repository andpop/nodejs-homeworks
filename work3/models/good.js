const db = require('./db');

module.exports.addGood = function (goodObj) {
  if (!db.has('goods').value()) {
    // console.log('No goods');
    db.set('goods', []).write();
  }

  db
    .get('goods').push({
      photo: goodObj.photo,
      name: goodObj.name,
      price: goodObj.price
    })
    .write();
};
