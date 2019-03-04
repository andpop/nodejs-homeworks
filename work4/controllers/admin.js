const skill = require('../models/skills');
const product = require('../models/products');

const fs = require('fs');
const path = require('path');
const util = require('util');
const validation = require('../libs/validation');
const unlink = util.promisify(fs.unlink);
const rename = util.promisify(fs.rename);

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
  const { name: productName, price: productPrice } = ctx.request.body;
  const { path: filePath, name: targetFilename } = ctx.request.files.photo;

  const responseErr = validation(productName, productPrice);
  if (responseErr) {
    await unlink(filePath);
    ctx.session.msgfile = responseErr.message;
    ctx.redirect('/admin');
    return;
  }

  const fileName = path.join(process.cwd(), 'public', 'upload', targetFilename);

  const errUpload = await rename(filePath, fileName);
  if (errUpload) {
    ctx.session.msgfile = 'Ошибка при загрузке изображения на сервер';
    ctx.redirect('/admin');
    return;
  }

  product.saveProductToDB({
    photo: targetFilename,
    name: productName,
    price: +productPrice
  });

  ctx.session.msgfile = 'Товар занесен в базу данных';
  ctx.redirect('/admin');
};
