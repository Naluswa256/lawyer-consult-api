const httpStatus = require('http-status');
const packageService = require('../services/package.service');
const catchAsync = require('../utils/catchAsync');

const createPackage = catchAsync(async (req, res) => {
  const newPackage = await packageService.createPackage(req.body);
  res.status(httpStatus.CREATED).json(newPackage);
});

const getAllPackages = catchAsync(async (req, res) => {
  const packages = await packageService.getAllPackages();
  res.status(httpStatus.OK).json(packages);
});

const getPackageById = catchAsync(async (req, res) => {
  const { packageId } = req.params;
  const lawyerPackage = await packageService.getPackageById(packageId);

  if (!lawyerPackage) {
    return res.status(httpStatus.NOT_FOUND).json({ error: 'Package not found' });
  }

  res.status(httpStatus.OK).json(lawyerPackage);
});

const updatePackage = catchAsync(async (req, res) => {
  const { packageId } = req.params;
  const updateData = req.body;

  const updatedPackage = await packageService.updatePackage(packageId, updateData);

  if (!updatedPackage) {
    return res.status(404).json({ error: 'Package not found' });
  }

  res.status(httpStatus.OK).json(updatedPackage);
});

const deletePackage = async (req, res) => {
  const { packageId } = req.params;
  await packageService.deletePackage(packageId);
  res.status(httpStatus.NO_CONTENT).json(); // No content
};

module.exports = {
  createPackage,
  getAllPackages,
  updatePackage,
  getPackageById,
  deletePackage,
};
