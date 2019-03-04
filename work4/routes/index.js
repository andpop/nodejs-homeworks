const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');
const path = require('path');

const isAdmin = (ctx, next) => {
  // если в сессии текущего пользователя есть пометка о том, что он является
  // администратором
  if (ctx.session.isAdmin) {
    // то всё хорошо :)
    return next();
  }
  // если нет, то перебросить пользователя на главную страницу сайта
  ctx.redirect('/login');
};

const controllerIndex = require('../controllers/index');
const controllerAdmin = require('../controllers/admin');
const controllerLogin = require('../controllers/login');

router.get('/', controllerIndex.showMainPage);
router.post('/', koaBody(), controllerIndex.sendMessage);

router.get('/admin', isAdmin, controllerAdmin.showAdminPanel);
router.post(
  '/admin/skills',
  koaBody(),
  isAdmin,
  controllerAdmin.saveSkills
);
router.post(
  '/admin/upload',
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(process.cwd(), 'public', 'upload')
    }
  }),
  isAdmin,
  controllerAdmin.saveProduct
);

router.get('/login.html', controllerLogin.showLoginForm);
router.get('/login', controllerLogin.showLoginForm);
router.post(
  '/login',
  koaBody(),
  controllerLogin.authorization
);

module.exports = router;
