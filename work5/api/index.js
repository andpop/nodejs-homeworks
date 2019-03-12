const user = require('../models/user');

module.exports.saveNewUser = function (req, res) {
  // TODO Сделать проверку входных данных
  // TODO Сделать сохранение пользователя в MongoDB

  const newUser = JSON.parse(req.body);
  const responseUser = user.createUser(newUser);
  res.json(responseUser);

  // console.log(responseUser);
  // let responseString = JSON.stringify(responseUser);
  // res.send(responseString);
};
