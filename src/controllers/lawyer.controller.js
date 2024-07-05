const httpStatus = require('http-status');
const { lawyerService } = require('../services');
const catchAsync = require('../utils/catchAsync');

/**
 * Fetch lawyers by specialization
 */
const fetchLawyersBySpecialization = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { specializationId } = req.params;
  const filter = { specializations: specializationId, isProfilePublic: true };
  const options = { sortBy: 'rating:desc', limit, page }; // Sorting by rating in descending order
  const lawyers = await lawyerService.fetchLawyersBySpecialization(filter, options);
  res.status(httpStatus.OK).send(lawyers);
});

/**
 * Search lawyers in specialization by name
 */
const searchLawyersInSpecializationByName = catchAsync(async (req, res) => {
  const { specializationId } = req.params;
  const { name, limit = 10, page = 1 } = req.query;

  const lawyers = await lawyerService.searchLawyersInSpecializationByName(specializationId, name, limit, page);
  res.status(httpStatus.OK).send(lawyers);
});

/**
 * Search lawyers by name
 */
const searchLawyersByName = catchAsync(async (req, res) => {
  const { name, limit = 10, page = 1 } = req.query;

  const lawyers = await lawyerService.searchLawyersByName(name, limit, page);
  res.status(httpStatus.OK).send(lawyers);
});

/**
 * Fetch popular lawyers
 */
const fetchPopularLawyers = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const filter = {
    isProfilePublic: true,
    $or: [
      { isVerified: true },
      { completedConsultations: { $gte: 5 } },
      { numOfReviews: { $gte: 5 } },
      { averageRating: { $gte: 4.5 } },
    ],
  };
  const options = { sortBy: 'rating:desc,receivedReviews:desc', limit, page }; // Sorting by rating and receivedReviews in descending order
  const popularLawyers = await lawyerService.fetchPopularLawyers(filter, options);
  res.status(httpStatus.OK).send(popularLawyers);
});

/**
 * Get lawyer availability
 */
const getLawyerAvailability = catchAsync(async (req, res) => {
  const { lawyerId } = req.params;
  const availability = await lawyerService.getLawyerAvailability(lawyerId);
  res.status(httpStatus.OK).json(availability);
});

module.exports = {
  fetchLawyersBySpecialization,
  searchLawyersInSpecializationByName,
  searchLawyersByName,
  fetchPopularLawyers,
  getLawyerAvailability,
};
