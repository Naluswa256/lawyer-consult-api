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
const getSpecializations = async (filter,options) => {
  const specializations = await Specialization.paginate(filter, options);
  return specializations;
};

/**
 * Search specializations by name
 * @param {string} name - The name or partial name to search for
 * @returns {Promise<Array>} - List of matching specializations
 */
const searchSpecializationsByName = async (name, limit , page) => {
  const options ={
    limit, 
    page
  }
  const regex = new RegExp(name, 'i');
  const filter = { name: { $regex: regex } };
  return Specialization.paginate(filter, options);
};

module.exports = {
  createSpecialization,
  getSpecializations,
  searchSpecializationsByName,
};
