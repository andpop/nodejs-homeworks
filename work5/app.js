const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

const app = express();

// Запросы от фронта приходят с Content-type: plain/text
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
const config = require('./config');
app.use(session(config.session));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});
