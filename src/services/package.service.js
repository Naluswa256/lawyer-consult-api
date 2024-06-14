const { Package } = require('../models');

const createPackage = async (packageData) => {
  const newPackage = new Package(packageData);
  return newPackage.save(); // Removed await here
};

const getAllPackages = async () => {
  return Package.find(); // Removed await here
};

const getPackageById = async (packageId) => {
  return Package.findById(packageId); // Removed await here
};

const updatePackage = async (packageId, updateData) => {
  const updatedPackage = await Package.findByIdAndUpdate(packageId, updateData, { new: true });
  return updatedPackage;
};

const deletePackage = async (packageId) => {
  return Package.findByIdAndDelete(packageId); // Removed await here
};

module.exports = {
  createPackage,
  getAllPackages,
  updatePackage,
  getPackageById,
  deletePackage,
};
