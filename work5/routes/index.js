const express = require('express');
const router = express.Router();

const apiUser = require('../api/user');
const apiNews = require('../api/news');

// router.post('/*', (req, res) => {
//   res.send('POST-запрос');
//   console.log(req.body);
// });
router.post('/api/login', apiUser.login);
router.post('/api/saveNewUser', apiUser.saveNewUser);
router.get('/api/getUsers', apiUser.getAllUsers);
router.put('/api/updateUserPermission/:id', apiUser.updateUserPermissions);

router.get('/api/getNews', apiNews.getAllNews);
router.post('/api/newNews', apiNews.saveNewNews);
router.put('/api/updateNews/:id', apiNews.updateNews);
router.delete('/api/deleteNews/:id', apiNews.deleteNews);

router.get('/*', (req, res) => {
  res.redirect('/index.html');
});

module.exports = router;
