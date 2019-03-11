const user = require('../models/user');

module.exports.saveNewUser = function (req, res) {
  const newUser = JSON.parse(req.body);
  const responseUser = user.createUser(newUser);

  console.log(responseUser);
  let responseString = JSON.stringify(responseUser);

  // res.send('POST-запрос');
/*
  let responseString = '{\n' +
    '  "__id": "7070b8f5-cf3a-4714-89a2-f87ff90618fe",\n' +
    '  "id": 331,\n' +
    '  "username": "andpop",\n' +
    '  "password": "$2a$10$qxJ1/xr5UeA2aeL6JMV8veL5Z8kHbJbvP8/3EHJpcAwOhMDZ5zMHi",\n' +
    '  "firstName": "Андрей",\n' +
    '  "surName": "Попов",\n' +
    '  "middleName": "Владимирович",\n' +
    '  "permission": {\n' +
    '    "__id": "95bd0366-4641-4677-92e7-49147794f407",\n' +
    '    "id": 331,\n' +
    '    "chat": {\n' +
    '      "__id": "94cf7676-5ce4-4e45-a49a-eb13ebe273cc",\n' +
    '      "id": 331,\n' +
    '      "C": false,\n' +
    '      "R": true,\n' +
    '      "U": true,\n' +
    '      "D": false,\n' +
    '      "updatedAt": "2019-03-10T17:12:59.090Z",\n' +
    '      "createdAt": "2019-03-10T17:12:59.090Z"\n' +
    '    },\n' +
    '    "news": {\n' +
    '      "__id": "95993d12-a8be-496f-820a-7aca747a57a3",\n' +
    '      "id": 331,\n' +
    '      "C": false,\n' +
    '      "R": true,\n' +
    '      "U": false,\n' +
    '      "D": false,\n' +
    '      "updatedAt": "2019-03-10T17:12:59.091Z",\n' +
    '      "createdAt": "2019-03-10T17:12:59.091Z"\n' +
    '    },\n' +
    '    "setting": {\n' +
    '      "__id": "bf1bb67e-9bcc-482c-a40e-afe6df671f2c",\n' +
    '      "id": 331,\n' +
    '      "C": false,\n' +
    '      "R": false,\n' +
    '      "U": false,\n' +
    '      "D": false,\n' +
    '      "updatedAt": "2019-03-10T17:12:59.092Z",\n' +
    '      "createdAt": "2019-03-10T17:12:59.092Z"\n' +
    '    },\n' +
    '    "updatedAt": "2019-03-10T17:12:59.088Z",\n' +
    '    "createdAt": "2019-03-10T17:12:59.088Z",\n' +
    '    "chatId": 331,\n' +
    '    "newsId": 331,\n' +
    '    "settingId": 331\n' +
    '  },\n' +
    '  "access_token": "855c03c0-19f0-4cc2-a444-dc5479f41600",\n' +
    '  "updatedAt": "2019-03-10T17:12:59.083Z",\n' +
    '  "createdAt": "2019-03-10T17:12:59.083Z",\n' +
    '  "permissionId": 331,\n' +
    '  "image": null\n' +
    '}\n';
*/
  res.send(responseString);
  // console.log(req.body);
};
