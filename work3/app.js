const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  // TODO Добавить header с utf-8, чтобы отображалась кириллица
  res.end('Error: ', { message: err.message, error: err });
});

// app.get('/', function (req, res) {
//   res.send('Hello World! Yeaaaaa!!!');
// });

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});