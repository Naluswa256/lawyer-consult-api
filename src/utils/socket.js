// socket.js
const { Appointment } = require('../models');

const clients = {};

const initializeSocket = (socket) => {
  socket.on('register', (data) => {
    const { userId } = data;
    clients[userId] = socket;
  });

  socket.on('disconnect', () => {
    // Remove disconnected clients
    Object.keys(clients).forEach((userId) => {
      if (clients[userId] === socket) {
        delete clients[userId];
      }
    });
  });
};

const emitEvent = async (io, event, data) => {
  const { appointmentId } = data;
  const appointment = await Appointment.findById(appointmentId).populate('userId');
  const userId = appointment.userId._id.toString();

  if (clients[userId]) {
    clients[userId].emit(event, data);
  }
};

const sendNotification = async (userId, notification) => {
  if (clients[userId]) {
    clients[userId].emit('notification', notification);
  }
};

module.exports = (socket) => {
  initializeSocket(socket);
};

module.exports.emitEvent = emitEvent;
module.exports.sendNotification = sendNotification;
