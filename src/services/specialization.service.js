const { Specialization } = require('../models');

/**
 * Create a new specialization
 * @param {Object} specializationBody
 * @returns {Promise<Specialization>}
 */
const createSpecialization = async (specializationBody) => {
  if (await Specialization.isNameTaken(specializationBody.name)) {
    throw new Error('Specialization name already taken');
  }
  const specialization = await Specialization.create(specializationBody);
  return specialization;
};

/**
 * Get all specializations
 * @returns {Promise<Array<Specialization>>}
 */
const getSpecializations = async () => {
  const specializations = await Specialization.find();
  return specializations;
};

/**
 * Search specializations by name
 * @param {string} name - The name or partial name to search for
 * @returns {Promise<Array>} - List of matching specializations
 */
const searchSpecializationsByName = async (name) => {
  const regex = new RegExp(name, 'i');
  return Specialization.find({ name: { $regex: regex } });
};

module.exports = {
  createSpecialization,
  getSpecializations,
  searchSpecializationsByName,
};
