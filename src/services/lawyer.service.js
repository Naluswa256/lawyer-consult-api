const { User, Appointment } = require('../models');

/**
 * Fetch lawyers by specialization ID
 */
const fetchLawyersBySpecialization = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};
/**
 * Search for lawyers in a specialization by name
 * @param {string} specializationId - The ID of the specialization
 * @param {string} name - The name or partial name of the lawyer
 * @param {number} [limit=10] - The maximum number of lawyers to return
 * @returns {Promise<Array>} - List of lawyers
 */
const searchLawyersInSpecializationByName = async (specializationId, name, limit = 10) => {
  const regex = new RegExp(name, 'i');
  return User.find({
    specializations: specializationId,
    fullName: { $regex: regex },
    isProfilePublic: true,
  }).limit(limit);
};

/**
 * Search for lawyers by name
 * @param {string} name - The name or partial name of the lawyer
 * @param {number} [limit=10] - The maximum number of lawyers to return
 * @returns {Promise<Array>} - List of lawyers
 */
const searchLawyersByName = async (name, limit = 10) => {
  const regex = new RegExp(name, 'i');
  return User.find({
    fullName: { $regex: regex },
    isProfilePublic: true,
  }).limit(limit);
};

/**
 * Fetch popular lawyers.
 *
 */

const fetchPopularLawyers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
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
