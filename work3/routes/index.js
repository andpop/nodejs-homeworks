const express = require('express');
const router = express.Router();

const isAdmin = (req, res, next) => {
  // если в сессии текущего пользователя есть пометка о том, что он является
  // администратором
  if (req.session.isAdmin) {
    // то всё хорошо :)
    return next();
  }
  // если нет, то перебросить пользователя на главную страницу сайта
  res.redirect('/login');
};

const controllerIndex = require('../controllers/index');
const controllerAdmin = require('../controllers/admin');
const controllerLogin = require('../controllers/login');

router.get('/', controllerIndex.get);
router.post('/', controllerIndex.post);

router.get('/admin', isAdmin, controllerAdmin.get);
router.post('/admin/skills', controllerAdmin.skills);
router.post('/admin/upload', controllerAdmin.upload);

router.get('/login.html', controllerLogin.get);
router.get('/login', controllerLogin.get);
router.post('/login', controllerLogin.post);

module.exports = router;
