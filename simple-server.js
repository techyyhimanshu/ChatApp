const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    socket.send('Received: ' + msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = 3300;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
