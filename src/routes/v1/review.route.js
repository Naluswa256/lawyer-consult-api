const express = require('express');
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleLawyerReviews,
} = require('../../controllers/review.controller');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const reviewValidation = require('../../validations/review.validation');

const router = express.Router();

router.route('/').post(auth(), validate(reviewValidation.createReviewSchema), createReview).get(auth(), getAllReviews);

router
  .route('/:id')
  .get(auth(), getSingleReview)
  .patch(auth(), validate(reviewValidation.updateReviewSchema), updateReview)
  .delete(auth(), deleteReview);

router.route('/lawyer/:id').get(auth(), getSingleLawyerReviews);

module.exports = router;
