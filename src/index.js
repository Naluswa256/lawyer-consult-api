const mongoose = require('mongoose');
const { app, io } = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const socketLogic = require('./utils/socket');
const { Specialization, Appointment} = require('./models');
const { specializations} = require('./config/populate');

const sampleAppointments = [
  {
    userId: '668eeffe7d50f9005c25f2a3',
    appointmentType: 'videoCall',
    lawyerId: '668eedef7d50f9005c25f27f',
    date: new Date('2023-07-15'),
    startTime: new Date('2023-07-15T10:00:00'),
    endTime: new Date('2023-07-15T11:00:00'),
    topic: 'Discussing case details',
    status: 'confirmed',
    paymentStatus: 'unpaid',
    notes: 'Discussing case details',
    package: {
      duration: 60,
      price: 50,
    },
    bookingReference: 'ABCDE12345',
    isAnonymous: false,
    transactionReference: 'TXN12345',
  },
  {
    userId: '668eeffe7d50f9005c25f2a3',
    appointmentType: 'voiceCall',
    lawyerId: '668eedef7d50f9005c25f277',
    date: new Date('2023-07-16'),
    startTime: new Date('2023-07-16T13:00:00'),
    endTime: new Date('2023-07-16T14:00:00'),
    topic: 'Consultation about property law',
    status: 'confirmed',
    paymentStatus: 'unpaid',
    notes: 'Consultation about property law',
    package: {
      duration: 60,
      price: 50,
    },
    bookingReference: 'FGHIJ67890',
    isAnonymous: false,
    transactionReference: 'TXN67890',
  },
  {
    userId: '668eeffe7d50f9005c25f2a3',
    appointmentType: 'physicalMeeting',
    lawyerId: '668eedef7d50f9005c25f27f',
    date: new Date('2023-07-17'),
    startTime: new Date('2023-07-17T15:00:00'),
    endTime: new Date('2023-07-17T16:00:00'),
    topic: 'Legal document signing',
    status: 'cancelled',
    paymentStatus: 'unpaid',
    notes: 'Meeting cancelled due to client request',
    package: {
      duration: 60,
      price: 50,
    },
    bookingReference: 'KLMNO12345',
    isAnonymous: false,
    transactionReference: 'TXN99999',
  },
  {
    userId: '668eeffe7d50f9005c25f2a3',
    appointmentType: 'videoCall',
    lawyerId: '668eedef7d50f9005c25f277',
    date: new Date('2023-07-18'),
    startTime: new Date('2023-07-18T11:00:00'),
    endTime: new Date('2023-07-18T12:00:00'),
    topic: 'Reviewing contract details',
    status: 'completed',
    paymentStatus: 'paid',
    notes: 'Contract details reviewed and finalized',
    package: {
      duration: 60,
      price: 50,
    },
    bookingReference: 'PQRST67890',
    isAnonymous: false,
    transactionReference: 'TXN77777',
  },
];

async function seedSpecializations() {
  try {
    await Specialization.deleteMany({});
    await Specialization.insertMany(specializations);
    logger.info('Sample specializations seeded successfully.');
  } catch (error) {
    logger.error('Error seeding sample specializations:', error);
    throw error;
  }
}

async function clearAppointments() {
  try {
    await Appointment.deleteMany({});
    logger.info('Appointments cleared successfully.');
  } catch (error) {
    logger.error('Error clearing appointments:', error);
    throw error;
  }
}

async function seedAppointments() {
  try {
    await clearAppointments();
    await Appointment.insertMany(sampleAppointments);
    logger.info('Sample appointments seeded successfully.');
  } catch (error) {
    logger.error('Error seeding sample appointments:', error);
    throw error;
  }
}

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  seedSpecializations().then(() => {
    seedAppointments().then(() => {
      server = app.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
      });

      io.on('connection', (socket) => {
        logger.info('New client connected');
        socketLogic.initializeSocket(socket);
      });
    }).catch((error) => {
      logger.error('Error seeding appointments:', error);
      process.exit(1);
    });
  }).catch((error) => {
    logger.error('Error seeding specializations:', error);
    process.exit(1);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
