const path = require('path');
const db = require('./db');

// Добавляет в БД новый товар из админки
module.exports.saveProductToDB = function (productObj) {
  if (!db.has('products').value()) {
    db.set('products', []).write();
  }

  db
    .get('products').push({
      photo: productObj.photo,
      name: productObj.name,
      price: productObj.price
    })
    .write();
};

// Формирует массив товаров для рендеринга главной страницы
module.exports.get = function () {
  // const uploadDir = path.join('/public', 'saveProduct');
  const products = db.get('products').value() || [];
  const productsForRender = [];

  for (let product of products) {
    let itemForRender = {
      'src': path.join('./upload', product.photo),
      'name': product.name,
      'price': product.price
    };
    productsForRender.push(itemForRender);
  }
  return productsForRender;
};
