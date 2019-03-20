const express = require('express');
const router = express.Router();

const apiUser = require('../api/user');
const apiNews = require('../api/news');

const isLoginedUser = (req, res, next) => {
  console.log(req.session);
  console.log(req.session.cookie);
  // если в сессии текущего пользователя есть пометка о том, что он залогинился
  if (req.session.isLoginedUser) {
    // то всё хорошо :)
    return next();
  }
  // если нет, то перебросить пользователя на главную страницу сайта
  res.redirect('/index.html');
};

router.post('/api/login', apiUser.login);
router.post('/api/saveNewUser', apiUser.saveNewUser);
router.get('/api/getUsers', isLoginedUser, apiUser.getAllUsers);
router.put('/api/updateUserPermission/:id', isLoginedUser, apiUser.updateUserPermissions);
router.put('/api/updateUser/:id', isLoginedUser, apiUser.updateUserInfo);
router.post('/api/saveUserImage/:id', isLoginedUser, apiUser.saveUserImage);
router.delete('/api/deleteUser/:id', isLoginedUser, apiUser.deleteUser);

router.get('/api/getNews', isLoginedUser, apiNews.getAllNews);
router.post('/api/newNews', isLoginedUser, apiNews.saveNewNews);
router.put('/api/updateNews/:id', isLoginedUser, apiNews.updateNews);
router.delete('/api/deleteNews/:id', isLoginedUser, apiNews.deleteNews);

router.get('/*', (req, res) => {
  res.redirect('/index.html');
});

module.exports = router;
