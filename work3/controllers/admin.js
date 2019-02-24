const db = require('../models/db')();

module.exports.get = function (req, res) {
  res.render('pages/admin');
};

module.exports.skills = function (req, res) {
  console.log('POST /admin/skills');
  console.log(req.body.age, req.body.concerts, req.body.cities, req.body.years);
  db.set('skills', {
    'age': req.body.age,
    'concerts': req.body.concerts,
    'cities': req.body.cities,
    'years': req.body.years
  });
  db.save();
};

module.exports.upload = function (req, res) {
  console.log('POST /admin/upload');
  console.log(req.body.photo, req.body.name, req.body.price);
  db.set('goods', {
    'photo': req.body.photo,
    'name': req.body.name,
    'price': req.body.price
  });
  db.save();
};
