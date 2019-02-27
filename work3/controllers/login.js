module.exports.get = function (req, res) {
  res.render('pages/login');
};

module.exports.post = function (req, res) {
  console.log('POST /login');
  console.log(req.body.email, req.body.password);

  req.session.isAdmin = true;
  res.redirect('/admin');
  // console.log(req.session);

  // res.send(req.body.email + ' ' + req.body.password);
};
