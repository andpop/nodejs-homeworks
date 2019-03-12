const user = require('../models/user');

module.exports.saveNewUser = function (req, res) {
  // TODO Сделать проверку входных данных
  // TODO Сделать сохранение пользователя в MongoDB

  const newUser = JSON.parse(req.body);
  // const responseUser = user.createUser(newUser);
  user.createUser(newUser)
    .then(responseUser => {
      res.json(responseUser);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });
};
