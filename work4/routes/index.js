const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');
// const controllers = require('../controllers');

/*
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
*/

const controllerIndex = require('../controllers/index');
const controllerAdmin = require('../controllers/admin');
const controllerLogin = require('../controllers/login');

router.get('/', controllerIndex.showMainPage);
router.post('/', controllerIndex.sendMessage);

// router.get('/admin', isAdmin, controllerAdmin.showAdminPanel);
// router.post('/admin/skills', isAdmin, controllerAdmin.saveSkills);
// router.post('/admin/upload', isAdmin, controllerAdmin.saveProduct);

router.get('/login.html', controllerLogin.showLoginForm);
router.get('/login', controllerLogin.showLoginForm);
router.post('/login', controllerLogin.authorization);

module.exports = router;
