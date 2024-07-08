// utils/socketLogic.js
const { Appointment } = require('../models');

const clients = {};

const initializeSocket = (socket) => {
  socket.on('register', (data) => {
    const { userId } = data;
    clients[userId] = socket.id;
  });

  socket.on('disconnect', () => {
    Object.keys(clients).forEach((userId) => {
      if (clients[userId] === socket.id) {
        delete clients[userId];
      }
    });
  });
};

const emitEvent = async (io, event, data) => {
  const { userId } = data;

  if (clients[userId]) {
    const socketId = clients[userId];
    if (io.sockets.sockets.get(socketId)) {
      io.sockets.sockets.get(socketId).emit(event, data);
    }
  }
};

const sendNotification = async (userId, notification) => {
  if (clients[userId]) {
    const socketId = clients[userId];
    if (io.sockets.sockets.get(socketId)) {
      io.sockets.sockets.get(socketId).emit('notification', notification);
    }
  }
};

module.exports = {
  initializeSocket,
  emitEvent,
  sendNotification,
};
