// services/specialization.service.js

const httpStatus = require('http-status');
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

module.exports = {
  createSpecialization,
  getSpecializations,
};
