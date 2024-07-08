const mongoose = require('mongoose');
const { app, io } = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const socketLogic = require('./utils/socket');
const { Specialization, Appointment } = require('./models'); // Removed User model
const { specializations, sampleAppointments } = require('./config/populate'); // Removed sampleLawyers

let server;

async function fetchSpecializationIds() {
  try {
    const specializations = await Specialization.find({}, '_id'); 
    return specializations.map(spec => spec._id);
  } catch (error) {
    logger.error('Error fetching specializations:', error);
    throw error;
  }
}

async function seedSpecializations() {
  try {
    await Specialization.deleteMany({}); // Clear existing specializations if needed
    await Specialization.insertMany(specializations); // Insert sample specializations
    logger.info('Sample specializations seeded successfully.');
  } catch (error) {
    logger.error('Error seeding sample specializations:', error);
    throw error;
  }
}

async function seedAppointments() {
  try {
    await Appointment.deleteMany({}); // Clear existing appointments if needed
    await Appointment.insertMany(sampleAppointments); // Insert sample appointments
    logger.info('Sample appointments seeded successfully.');
  } catch (error) {
    logger.error('Error seeding sample appointments:', error);
    throw error;
  }
}

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');

  // Call the seeding functions after successful connection
  seedSpecializations().then(() => {
    fetchSpecializationIds().then(() => {
      seedAppointments().then(() => {
        server = app.listen(config.port, () => {
          logger.info(`Listening to port ${config.port}`);
        });

        io.on('connection', (socket) => {
          logger.info('New client connected');
          socketLogic(socket);
        });
      }).catch((error) => {
        logger.error('Error seeding appointments:', error);
        process.exit(1); // Exit process if seeding appointments fails
      });
    }).catch((error) => {
      logger.error('Error fetching specializations:', error);
      process.exit(1); // Exit process if fetching specializations fails
    });
  }).catch((error) => {
    logger.error('Error seeding specializations:', error);
    process.exit(1); // Exit process if seeding specializations fails
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
