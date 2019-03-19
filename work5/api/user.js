const user = require('../models/user');
const lib = require('../lib');

function isCRUD (permission) {
  const cruds = ['C', 'R', 'U', 'D'];
  return (cruds.indexOf(permission) !== -1);
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
  user.getAll()
    .then(newsList => {
      res.json(newsList);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });
};

module.exports.saveNewUser = function (req, res) {
  // TODO Сделать проверку входных данных через joi

  const newUser = JSON.parse(req.body);
  user.create(newUser)
    .then(responseUser => {
      req.session.isLoginedUser = true;
      res.json(responseUser);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });
};

module.exports.login = function (req, res) {
  const account = JSON.parse(req.body);
  user.getByUsername(account.username)
    .then(userObj => {
      if (userObj) {
        if (lib.validPassword(account.password, userObj.password)) {
          req.session.isLoginedUser = true;
          // console.log(req.session);
          res.json(userObj);
        } else {
          // TODO В каком виде нужно отсылать сообщения об ошибке???
          res.status(401).json({ err: 'Неправильное имя пользователя или пароль' });
        }
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

module.exports.updateUserInfo = function (req, res) {
  const userInfo = JSON.parse(req.body);
  user.updateInfo(userInfo)
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });
};

module.exports.saveUserImage = function (req, res) {
  user.saveImage(req)
    .then(uploadedFile => {
      res.json(uploadedFile);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });
};

module.exports.deleteUser = function (req, res) {
  user.deleteById(req.params.id)
    .then(result => {
      return user.getAll();
    })
    .then(userList => {
      res.json(userList);
    })
    .catch(err => {
      res.status(501).json({ err: err.message });
    });

  // res.redirect('/api/getUsers');
};
