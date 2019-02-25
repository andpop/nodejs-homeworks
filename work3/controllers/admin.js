const db = require('../models/db');

module.exports.get = function (req, res) {
  res.render('pages/admin');
};

module.exports.skills = function (req, res) {
  // console.log('POST /admin/skills');
  // console.log(req.body.age, req.body.concerts, req.body.cities, req.body.years);
  db
    .set('skills.age', +req.body.age)
    .set('skills.concerts', +req.body.concerts)
    .set('skills.cities', +req.body.cities)
    .set('skills.years', +req.body.years)
    .write();
};

module.exports.upload = function (req, res) {
  // console.log('POST /admin/upload');
  // console.log(req.body.photo, req.body.name, req.body.price);

  if (!db.has('goods').value()) {
    console.log('No goods');
    db.set('goods', []).write();
  }

  db
    .get('goods').push({
      photo: req.body.photo,
      name: req.body.name,
      price: +req.body.price
    })
    .write();
};
