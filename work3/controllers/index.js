const skills = require('../models/skills');
const products = require('../models/products');

module.exports.showMainPage = function (req, res) {
  const renderVars = {
    mySkills: skills.get(),
    myProducts: products.get()
  };

  res.render('pages/index', renderVars);
};

// Непонятно, что здесь нужно делать
module.exports.post = function (req, res) {
  console.log('POST /index');
  console.log(req.body.name, req.body.email, req.body.message);
};
