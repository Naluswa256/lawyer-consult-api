const httpStatus = require('http-status');
const specializationService = require('../services/specialization.service');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const createSpecialization = catchAsync(async (req, res) => {
  const specialization = await specializationService.createSpecialization(req.body);
  res.status(httpStatus.CREATED).send(specialization);
});

const getSpecializations = catchAsync(async (req, res) => {
  const filter = {};
  const options = pick(req.query, ['limit', 'page']);
  const specializations = await specializationService.getSpecializations(filter, options);
  res.send(specializations);
});
const searchSpecializations = catchAsync(async (req, res) => {
  const { name } = req.query;

  const specializations = await specializationService.searchSpecializationsByName(name);
  res.status(httpStatus.OK).send(specializations);
});
module.exports = {
  createSpecialization,
  getSpecializations,
  searchSpecializations,
};
