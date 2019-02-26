const skill = require('../models/skill');
const products = require('../models/product');

module.exports.get = function (req, res) {
  const renderVars = {
    mySkills: skill.getSkills(),
    myProducts: products.getProducts()
  };

  res.render('pages/index', renderVars);
};

module.exports.post = function (req, res) {
  console.log('POST /index');
  console.log(req.body.name, req.body.email, req.body.message);
};
