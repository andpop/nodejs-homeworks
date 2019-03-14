const express = require('express');
const router = express.Router();

const api = require('../api/index');

// router.post('/*', (req, res) => {
//   res.send('POST-запрос');
//   console.log(req.body);
// });
router.post('/api/saveNewUser', api.saveNewUser);
router.post('/api/login', api.login);

router.get('/api/getNews', api.getAllNews);
router.post('/api/newNews', api.saveNewNews);
router.put('/api/updateNews/:id', api.updateNews);

router.get('/*', (req, res) => {
  res.redirect('/index.html');
});

module.exports = router;
