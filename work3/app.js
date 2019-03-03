const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const session = require('koa-session');
const Pug = require('koa-pug');
const fs = require('fs');
const pug = new Pug({
  viewPath: './views',
  pretty: true,
  basedir: './views',
  noCache: true,
  app: app,
});


// const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
// const session = require('express-session');
const flash = require('connect-flash');

const config = require('./config');

app.use(static('./public'));

const errorHandler = require('./libs/error');

app.use(errorHandler);

app.on('error', (err, ctx) => {
  ctx.render('error', {
    status: ctx.response.status,
    error: ctx.response.message,
  });
});


//-------------------------------------------------------------
const PORT = process.env.PORT || 3000;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const config = require('./config');

app.use(session(config.session));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

// Ловим ошибку 404 и переходим в обработчик ошибок
app.use(function (req, res, next) {
  const err = new Error('Страница не найдена');
  err.status = 404;
  next(err);
});

// Обработчик ошибок
app.use(function (err, req, res, next) {
  // Отображаем сообщение об ошибке
  res.status(err.status || 500);
  res.set({ 'content-type': 'text/html; charset=utf-8' });
  res.end('Произошла ошибка: ', { message: err.message, error: err });
});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});
