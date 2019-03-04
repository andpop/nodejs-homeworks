const skill = require('../models/skills');
const product = require('../models/products');

module.exports.showAdminPanel = async function (ctx) {
  const skills = skill.get();
  const renderVars = {
    age: skills[0].number,
    concerts: skills[1].number,
    cities: skills[2].number,
    years: skills[3].number
  };

  if (ctx.session.msgskill) {
    renderVars.msgskill = ctx.session.msgskill;
    ctx.session.msgskill = '';
  }
  if (ctx.session.msgfile) {
    renderVars.msgfile = ctx.session.msgfile;
    ctx.session.msgfile = '';
  }

  ctx.render('pages/admin', renderVars);
};

module.exports.saveSkills = async function (ctx) {
  skill.set({
    age: +ctx.request.body.age,
    concerts: +ctx.request.body.concerts,
    cities: +ctx.request.body.cities,
    years: +ctx.request.body.years
  });
  ctx.session.msgskill = 'Счетчики записаны в базу данных';
  ctx.redirect('/admin');
};

module.exports.saveProduct = async function (ctx, next) {
  product.add(ctx, next);
  ctx.session.msgfile = 'Товар занесен в базу данных';
  ctx.redirect('/admin');
};
