module.exports.get = function (req, res) {
  res.render('pages/admin');
};

module.exports.skills = function (req, res) {
  console.log('POST /admin/skills');
};

module.exports.upload = function (req, res) {
  console.log('POST /admin/upload');
};
