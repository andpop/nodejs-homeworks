const skill = require('../models/skill');
const good = require('../models/good');

module.exports.get = function (req, res) {
  res.render('pages/admin');
};

module.exports.skills = function (req, res) {
  skill.setSkills({
    age: +req.body.age,
    concerts: +req.body.concerts,
    cities: +req.body.cities,
    years: +req.body.years
  });
};

module.exports.upload = function (req, res, next) {
  good.addGoodNew(req, res, next);
  // good.addGood({
  //   photo: req.body.photo,
  //   name: req.body.name,
  //   price: +req.body.price
  // });
};
