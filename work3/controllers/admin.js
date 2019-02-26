const skill = require('../models/skill');
const good = require('../models/product');

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
  good.addProduct(req, res, next);
};
