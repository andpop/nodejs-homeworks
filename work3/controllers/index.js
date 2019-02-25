const skill = require('../models/skill');

module.exports.get = function (req, res) {
  res.render('pages/index', skill.getSkills());
};

module.exports.post = function (req, res) {
  console.log('POST /index');
  console.log(req.body.name, req.body.email, req.body.message);
};
