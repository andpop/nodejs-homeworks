const Koa = require('koa');
const app = new Koa();
const koaStatic = require('koa-static');
const session = require('koa-session');
// const flash = require('koa-connect-flash');
const Pug = require('koa-pug');
const fs = require('fs');

const pug = new Pug({
  viewPath: './views',
  pretty: true,
  basedir: './views',
  noCache: true,
  app: app
});
const config = require('./config');

app.use(koaStatic('./public'));

// TODO Разобраться с обработкой ошибок
const errorHandler = require('./libs/error');
app.use(errorHandler);

app.on('error', (err, ctx) => {
  ctx.body = `Произошла ошибка ${ctx.response.status}: ${ctx.response.message}.`;
  // ctx.render('error', {
  //   status: ctx.response.status,
  //   error: ctx.response.message,
  // });
});

const router = require('./routes');

app
  .use(session(config.session, app))
  .use(router.routes())
  .use(router.allowedMethods())
  // .use(flash());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  if (!fs.existsSync(config.upload)) {
    fs.mkdirSync(config.upload);
  }
  console.log('Server start on port: ', PORT);
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(session(config.session));
// app.use(flash());
//
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', require('./routes/index'));

/*
// Ловим ошибку 404 и переходим в обработчик ошибок
app.use(function (req, res, next) {
  const err = new Error('Страница не найдена');
  err.status = 404;
  next(err);
});
*/

/*
// Обработчик ошибок
app.use(function (err, req, res, next) {
  // Отображаем сообщение об ошибке
  res.status(err.status || 500);
  res.set({ 'content-type': 'text/html; charset=utf-8' });
  res.end('Произошла ошибка: ', { message: err.message, error: err });
});
*/
