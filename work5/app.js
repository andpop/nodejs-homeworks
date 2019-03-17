const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
// const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

const app = express();

// Запросы от фронта приходят с Content-type: plain/text
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

const config = require('./config');
app.use(session(config.session));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

// Обработчик ошибок
/*
app.use(function (err, req, res, next) {
  // Отображаем сообщение об ошибке
  res.status(err.status || 500);
  res.set({ 'content-type': 'text/html; charset=utf-8' });
  res.end('Произошла ошибка: ', { message: err.message, error: err });
});
*/

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});
