const express = require('express');
const lawyerController = require('../../controllers/lawyer.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/specializations/:specializationId', auth(), lawyerController.fetchLawyersBySpecialization);
router.get('/specializations/:specializationId/search', auth(), lawyerController.searchLawyersInSpecializationByName);
router.get('/search', auth(), lawyerController.searchLawyersByName);
router.get('/popular', auth(), lawyerController.fetchPopularLawyers);
router.get('/:lawyerId/availability', lawyerController.getLawyerAvailability);
module.exports = router;
