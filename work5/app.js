const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3000;

const app = express();

// app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

const config = require('./config');

app.use(session(config.session));

app.use(express.static(path.join(__dirname, 'public')));

// На любой get-запрос возвращается index.html
app.get('/*', function (request, response) {
  response.redirect('/index.html');
});

app.use('/', require('./routes/index'));

/*
app.use('/', require('./routes/index'));

// Ловим ошибку 404 и переходим в обработчик ошибок
app.use(function (req, res, next) {
  const err = new Error('Страница не найдена');
  err.status = 404;
  next(err);
});

*/
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
