const skill = require('../models/skills');
const product = require('../models/products');

module.exports.showAdminPanel = function (req, res) {
  const skills = skill.get();
  const renderVars = {
    age: skills[0].number,
    concerts: skills[1].number,
    cities: skills[2].number,
    years: skills[3].number
  };

  const skillMessageArray = req.flash('msgskill');
  if (skillMessageArray.length > 0) {
    renderVars.msgskill = skillMessageArray[0];
  }
  const productMessageArray = req.flash('msgfile');
  if (productMessageArray.length > 0) {
    renderVars.msgfile = productMessageArray[0];
  }

  res.render('pages/admin', renderVars);
};

module.exports.saveSkills = function (req, res) {
  skill.set({
    age: +req.body.age,
    concerts: +req.body.concerts,
    cities: +req.body.cities,
    years: +req.body.years
  });
  req.flash('msgskill', 'Счетчики записаны в базу данных');
  res.redirect('/admin');
};

module.exports.saveProduct = function (req, res, next) {
  product.add(req, res, next);
  req.flash('msgfile', 'Товар занесен в базу данных');
  res.redirect('/admin');

};
