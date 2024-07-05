const { User, Appointment } = require('../models');

/**
 * Common function to populate User fields
 * @param {Query} query - The Mongoose query object
 * @returns {Query} - The populated query
 */
/**
 * Common function to populate User fields
 * @param {Query} query - The Mongoose query object
 * @returns {Query} - The populated query
 */
const populateUserFields = (query) => {
  return query
    .populate({
      path: 'reviewsReceived',
      select: '-_id rating comment',
      populate: [
        {
          path: 'user',
          select: 'avatar fullNames'
        },
        {
          path: 'lawyer',
          select: 'avatar fullNames'
        }
      ]
    })
    .populate({
      path: 'reviewsGiven',
      select: '-_id rating comment',
      populate: [
        {
          path: 'user',
          select: 'avatar fullNames'
        },
        {
          path: 'lawyer',
          select: 'avatar fullNames'
        }
      ]
    })
    .populate({
      path: 'appointments',
      populate: [
        {
          path: 'userId',
          select: 'avatar fullNames',
        },
        {
          path: 'lawyerId',
          select: 'avatar fullNames',
        },
      ],
      select: '-iv -tag',
    })
    .populate({
      path: 'specializations',
      select: 'name -_id -description',
    });
};

const fetchLawyersBySpecialization = async (filter, options) => {
  const usersResult = await User.paginate(filter, options);
  usersResult.results = await populateUserFields(User.find({ _id: { $in: usersResult.results.map(user => user._id) } })).exec();
  return usersResult;
};

/**
 * Search for lawyers in a specialization by name
 * @param {string} specializationId - The ID of the specialization
 * @param {string} name - The name or partial name of the lawyer
 * @param {number} [limit=10] - The maximum number of lawyers to return
 * @returns {Promise<Array>} - List of lawyers
 */
const searchLawyersInSpecializationByName = async (specializationId, name, limit = 10, page = 1) => {
  const regex = new RegExp(name, 'i');
  const filter = {
    specializations: specializationId,
    fullNames: { $regex: regex },
    isProfilePublic: true,
  };
  const options = {
    limit,
    page,
  };
  const usersResult = await User.paginate(filter, options);
  usersResult.results = await populateUserFields(User.find({ _id: { $in: usersResult.results.map(user => user._id) } })).exec();
  return usersResult;
};

/**
 * Search for lawyers by name
 * @param {string} name - The name or partial name of the lawyer
 * @param {number} [limit=10] - The maximum number of lawyers to return
 * @returns {Promise<Array>} - List of lawyers
 */
const searchLawyersByName = async (name, limit = 10, page = 1) => {
  const regex = new RegExp(name, 'i');
  const filter = {
    fullNames: { $regex: regex },
    isProfilePublic: true,
  };
  const options = {
    limit,
    page,
  };
  const usersResult = await User.paginate(filter, options);
  usersResult.results = await populateUserFields(User.find({ _id: { $in: usersResult.results.map(user => user._id) } })).exec();
  return usersResult;
};

/**
 * Fetch popular lawyers.
 */
const fetchPopularLawyers = async (filter, options) => {
  const usersResult = await User.paginate(filter, options);
  usersResult.results = await populateUserFields(User.find({ _id: { $in: usersResult.results.map(user => user._id) } })).exec();
  return usersResult;
};

/**
 * Get the availability of a lawyer
 * @param {string} lawyerId - The ID of the lawyer
 * @returns {Promise<Object>} - The availability object
 */
const getLawyerAvailability = async (lawyerId) => {
  const today = new Date();
  const appointments = await Appointment.find({
    lawyerId,
    status: 'confirmed',
    date: { $gte: today },
  });

  const availability = {
    takenSlots: [],
  };

  appointments.forEach((appointment) => {
    availability.takenSlots.push({
      date: appointment.date.toLocaleDateString(),
      startTime: appointment.startTime.toLocaleTimeString(),
      endTime: appointment.endTime.toLocaleTimeString(),
    });
  });

  return availability;
};

module.exports = {
  fetchLawyersBySpecialization,
  searchLawyersInSpecializationByName,
  searchLawyersByName,
  fetchPopularLawyers,
  getLawyerAvailability,
};