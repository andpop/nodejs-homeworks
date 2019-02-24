module.exports.get = function (req, res) {
  res.render('pages/index');
};

module.exports.post = function (req, res) {
  console.log('POST /index');
};
