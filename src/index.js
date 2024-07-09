const mongoose = require('mongoose');
const { app, io } = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const socketLogic = require('./utils/socket');
const { Specialization, Appointment, User } = require('./models'); 
const { specializations, sampleLawyers } = require('./config/populate'); 
let server;

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

async function seedLawyers() {
  try {
    await User.deleteMany({}); 
    await User.insertMany(sampleLawyers); 
    logger.info('Sample lawyers seeded successfully.');
  } catch (error) {
    logger.error('Error seeding sample lawyers:', error);
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

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  seedSpecializations().then(() => {
    seedLawyers().then(() => {
      clearAppointments().then(() => {
        server = app.listen(config.port, () => {
          logger.info(`Listening to port ${config.port}`);
        });

        io.on('connection', (socket) => {
          logger.info('New client connected');
          socketLogic.initializeSocket(socket);
        });
      }).catch((error) => {
        logger.error('Error clearing appointments:', error);
        process.exit(1); 
      });
    }).catch((error) => {
      logger.error('Error seeding lawyers:', error);
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
