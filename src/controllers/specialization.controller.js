// controllers/specialization.controller.js

const httpStatus = require('http-status');
const specializationService = require('../services/specialization.service');

const createSpecialization = async (req, res) => {
  const specialization = await specializationService.createSpecialization(req.body);
  res.status(httpStatus.CREATED).send(specialization);
};

const getSpecializations = async (req, res) => {
  const specializations = await specializationService.getSpecializations();
  res.send(specializations);
};

module.exports = {
  createSpecialization,
  getSpecializations,
};
