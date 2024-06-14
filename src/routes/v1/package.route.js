const express = require('express');
const packageController = require('../../controllers/package.controller');

const router = express.Router();

router.post('/', packageController.createPackage);
router.get('/', packageController.getAllPackages);
router.get('/:packageId', packageController.getPackageById);
router.put('/:packageId', packageController.updatePackage);
router.delete('/:packageId', packageController.deletePackage);

module.exports = router;
