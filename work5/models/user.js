// TODO Сделать генерацию id
function getId () {
  return 331;
}

// TODO Сделать генерацию токена
function getAccessToken () {
  return '855c03c0-19f0-4cc2-a444-dc5479f41600';
}

// TODO Сделать хэширование пароля
function hashPassword (password) {
  let hash = '$2a$10$qxJ1/xr5UeA2aeL6JMV8veL5Z8kHbJbvP8/3EHJpcAwOhMDZ5zMHi';
  return hash;
}

function getPermission (userId) {
  const permissions = {};
  permissions.id = userId;
  permissions.chat = {
    'id': userId,
    'C': false,
    'R': true,
    'U': true,
    'D': false
  };
  // permissions.news = {
  //   'id': userId,
  //   'C': false,
  //   'R': true,
  //   'U': true,
  //   'D': false
  // };
  permissions.news = {
    'id': userId,
    'C': true,
    'R': true,
    'U': true,
    'D': true
  };
  permissions.setting = {
    'id': userId,
    'C': false,
    'R': true,
    'U': true,
    'D': false
  };

  return permissions;
}

module.exports.createUser = function (userRegisterInfo) {
  const newUser = {};
  newUser.id = getId();
  newUser.access_token = getAccessToken();
  newUser.password = hashPassword(userRegisterInfo.password);
  newUser.username = userRegisterInfo.username;
  newUser.firstName = userRegisterInfo.firstName;
  newUser.middleName = userRegisterInfo.middleName;
  newUser.surName = userRegisterInfo.surName;
  newUser.img = userRegisterInfo.img;
  newUser.permissionId = newUser.id;
  newUser.permission = getPermission(newUser.id);

  return newUser;
  // console.log(newUser);
};
