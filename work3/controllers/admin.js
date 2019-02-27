const skill = require('../models/skills');
const product = require('../models/products');

module.exports.showAdminPanel = function (req, res) {
  res.render('pages/admin');
};

module.exports.saveSkills = function (req, res) {
  skill.set({
    age: +req.body.age,
    concerts: +req.body.concerts,
    cities: +req.body.cities,
    years: +req.body.years
  });
};

module.exports.saveProduct = function (req, res, next) {
  product.add(req, res, next);
};
