const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const db = require('./db');

// Добавляет в БД новый товар из админки
function saveProductToDB (goodObj) {
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
}

// Добавляет в БД новый товар из админки и загружает файл с картинкой в public/upload
module.exports.addProduct = function (req, res, next) {
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

    saveProductToDB({
      photo: files.photo.name,
      name: fields.name,
      price: +fields.price
    });

    const fileName = path.join(uploadDir, files.photo.name);

    fs.rename(files.photo.path, fileName, function (err) {
      if (err) {
        console.error(err.message);
      }
    });
  });
};
