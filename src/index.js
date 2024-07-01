const mongoose = require('mongoose');
const { app, io } = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const socketLogic = require('./utils/socket');
const {User, Specialization} = require('./models');
const {specializations, sampleLawyers} = require('./config/populate');

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

async function seedLawyers() {
  try {
    const specializationIds = await fetchSpecializationIds();
    sampleLawyers.forEach(lawyer => {
      const randomSpecializations = getRandomSpecializations(specializationIds, 2); // Get 2 random specialization IDs
      lawyer.specializations = randomSpecializations;
    });

    await User.deleteMany({ role: 'lawyer' }); // Clear existing lawyers if needed
    await User.insertMany(sampleLawyers);
    logger.info('Sample lawyers seeded successfully.');

  } catch (error) {
    logger.error('Error seeding sample lawyers:', error);
    throw error;
  }
}

function getRandomSpecializations(specializationIds, count) {
  const shuffledIds = specializationIds.sort(() => 0.5 - Math.random());
  return shuffledIds.slice(0, count);
}

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');

  // Call the seeding function after successful connection
  seedSpecializations().then(() => {
    fetchSpecializationIds().then(() => {
      seedLawyers().then(() => {
        server = app.listen(config.port, () => {
          logger.info(`Listening to port ${config.port}`);
        });

        io.on('connection', (socket) => {
          logger.info('New client connected');
          socketLogic(socket);
        });
      }).catch((error) => {
        logger.error('Error seeding lawyers:', error);
        process.exit(1); // Exit process if seeding fails
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
