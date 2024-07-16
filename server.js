const express = require('express');
const http = require('http');
const session = require('express-session');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const path = require('path');

const msgRoute = require('./routes/message');
const route = require('./routes/routes');
const msgController = require('./controllers/messageContrller'); // Import the socket controller

dotenv.config();

express.static(path.join(__dirname, 'views'));
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'mySecret', // Replace with a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routing
app.use(msgRoute);
app.use(route);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('a user connected');

  // Store the user's socket id
  socket.on('register', (username) => {
    msgController.registerUser(username, socket);
  });

  socket.on('disconnect', () => {
    msgController.handleDisconnect(socket);
  });

  socket.on('send message', async (msg) => {
    await msgController.sendMessage(msg, io);
  });
});

// Start the server
const PORT = process.env.PORT || 3300;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
