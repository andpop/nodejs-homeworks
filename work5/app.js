const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
// const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const chatUsers = [];
const newChatUser = {};

io.on('connection', function (socket) {
  console.log('User connected');
  newChatUser.id = socket.id;
  // newChatUser.username = socket.request.headers.username + ' ' + socket.id;
  newChatUser.username = socket.request.headers.username;
  chatUsers.push(newChatUser);
  socket.json.emit('all users', chatUsers);

  io.on('disconnect', function () {
    console.log('User disconnect');
  });
  io.on('chat message', function () {
    console.log('Chat message');
  });
});

// Запросы от фронта приходят с Content-type: plain/text
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cookieParser());
const config = require('./config');
app.use(session(config.session));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

// app.listen(PORT, function () {
//   console.log(`App listening on port ${PORT}!`);
// });
http.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});
