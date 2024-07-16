const io = require('socket.io-client');

const socket = io('http://localhost:3300');

socket.on('connect', () => {
  console.log('Connected');
  socket.emit('message', 'Hello Server');
});

socket.on('message', (data) => {
  console.log(`Received: ${data}`);
});

socket.on('disconnect', () => {
  console.log('Disconnected');
});

socket.on('error', (error) => {
  console.error('Socket error:', error);
});