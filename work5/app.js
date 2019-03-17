const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
// const FileStore = require('session-file-store')(session);
// const passport = require('passport');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

const app = express();

// Запросы от фронта приходят с Content-type: plain/text
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

const config = require('./config');
app.use(session(config.session));

// Пробовал авторизацию через passport - не получилось
// app.use(session({
//   store: new FileStore(),
//   secret: 'klop',
//   key: 'sessionkey',
//   cookie: {
//     'path': '/',
//     'httpOnly': true,
//     'maxAge': 30 * 60 * 1000
//   },
//   saveUninitialized: true,
//   resave: false,
//   ephemeral: true,
//   rolling: true
// }));

// require('./config/config-passport');
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// На любой get-запрос возвращается index.html
// app.get('/*', function (request, response) {
//   response.redirect('/index.html');
// });

app.use('/', require('./routes/index'));

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
