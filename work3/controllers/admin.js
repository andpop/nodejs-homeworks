module.exports.get = function (req, res) {
  res.render('pages/admin');
};

module.exports.skills = function (req, res) {
  console.log('POST /admin/skills');
  console.log(req.body.age, req.body.concerts, req.body.cities, req.body.years);
};

module.exports.upload = function (req, res) {
  console.log('POST /admin/upload');
  console.log(req.body.photo, req.body.name, req.body.price);
};
