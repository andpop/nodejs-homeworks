const user = require('../models/user');

function isCRUD (permission) {
  const cruds = ['C', 'R', 'U', 'D'];
  return (cruds.indexOf(permission) != -1);
}

function getChangedPermissions (permissionInfo) {
  const changedPermissions = {};

  for (let category in permissionInfo.permission) {
    for (let permission in permissionInfo.permission[category]) {
      if (isCRUD(permission)) {
        let permissionPath = `permission.${category}.${permission}`;
        changedPermissions[permissionPath] = permissionInfo.permission[category][permission];
      }
    }
  }
  return changedPermissions;
}

module.exports.getAllUsers = function (req, res) {
  user.getAllUsers()
    .then(newsList => {
      res.json(newsList);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });

};

module.exports.saveNewUser = function (req, res) {
  // TODO Сделать проверку входных данных

  const newUser = JSON.parse(req.body);
  user.createUser(newUser)
    .then(responseUser => {
      res.json(responseUser);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });
};

module.exports.login = function (req, res) {
  const account = JSON.parse(req.body);
  user.getUserByUsername(account.username)
    .then(userObj => {
      if (userObj) {
        res.json(userObj);
      } else {
        res.status(401).json({ err: 'Неправильное имя пользователя или пароль' });
      }
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });
};

module.exports.updateUserPermissions = function (req, res) {
  const permissionInfo = JSON.parse(req.body);
  const changedPermissions = getChangedPermissions(permissionInfo);
  user.updatePermissions(permissionInfo.permissionId, changedPermissions)
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });
};
