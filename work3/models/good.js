const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const db = require('./db');

// Добавляет в БД новый товар из админки
module.exports.addGood = function (goodObj) {
  if (!db.has('goods').value()) {
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

module.exports.addGoodNew = function (req, res, next) {
  const form = new formidable.IncomingForm();
  const uploadDir = path.join('./public', 'upload');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  form.uploadDir = path.join(process.cwd(), uploadDir);

  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err);
    }

    console.log(fields.name, fields.price, files.photo.name);

    const fileName = path.join(uploadDir, files.photo.name);
    console.log(fileName);

    fs.rename(files.photo.path, fileName, function (err) {
      if (err) {
        console.error(err.message);
      }
    });
  });
};
