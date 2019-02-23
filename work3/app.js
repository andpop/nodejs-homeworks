const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send('Hello World! Yeaaaaa!!!');
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
