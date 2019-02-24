module.exports.get = function (req, res) {
  res.render('pages/index');
};

module.exports.post = function (req, res) {
  console.log('POST /index');
  console.log(req.body.name, req.body.email, req.body.message);
  // res.send(req.body.name + ' ' + req.body.email + ' ' + req.body.message);
};
