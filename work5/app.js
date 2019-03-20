const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
// const cookieParser = require('cookie-parser');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const chat = require('./chat');

module.exports.chatUsers = {};

io.on('connection', chat.chatHandler);

// Запросы от фронта приходят с Content-type: plain/text
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cookieParser());
const config = require('./config');
// app.use(session(config.session));
app.use(session({
  'store': new FileStore(),
  'secret': 'klop',
  'key': 'sessionkey',
  'cookie': {
    'path': '/',
    'httpOnly': true,
    'maxAge': 1800000
  },
  'saveUninitialized': false,
  'resave': true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

http.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});
