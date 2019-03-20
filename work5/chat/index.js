const app = require('../app');

module.exports.chatHandler = function (socket) {
  if (socket.request.headers.username) {
    app.chatUsers[socket.id] = {
      'id': socket.id,
      'username': socket.request.headers.username
    };

    socket.json.emit('all users', app.chatUsers);
    socket.json.broadcast.emit('new user',
      {
        'id': socket.id,
        'username': socket.request.headers.username
      });
  }

  socket.on('disconnect', function () {
    delete app.chatUsers[socket.id];
    socket.broadcast.emit('delete user', socket.id);
  });

  socket.on('chat message', (message, userId) => {
    // io.to(`${userId}`).emit('chat message', data, socket.id);
    if (userId !== socket.id) {
      this.to(`${userId}`).emit('chat message', message, socket.id);
    }
  });

}