// routes/specialization.routes.js

const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const specializationValidation = require('../../validations/specialization.validation');
const specializationController = require('../../controllers/specialization.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageSpecializations'),
    validate(specializationValidation.createSpecialization),
    specializationController.createSpecialization
  )
  .get(auth('getSpecializations'), specializationController.getSpecializations);

module.exports = router;
