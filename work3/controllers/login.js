module.exports.get = function (req, res) {
  res.render('pages/login');
};

module.exports.post = function (req, res) {
  console.log('POST /login');
};
