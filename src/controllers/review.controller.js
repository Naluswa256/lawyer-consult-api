const { StatusCodes } = require('http-status-codes');
const reviewService = require('../services/review.service');
const userService = require('../services/user.service');
const CustomError = require('../errors');

const createReview = async (req, res) => {
  const { lawyer: lawyerId, rating, comment } = req.body;
  const { _id: userId } = req.user;

  const isValidLawyer = await userService.findUserById(lawyerId);
  if (!isValidLawyer) {
    throw new CustomError.NotFoundError(`No lawyer with id: ${lawyerId}`);
  }

  const alreadySubmittedReview = await reviewService.findReview({
    lawyer: lawyerId,
    user: userId,
  });
  if (alreadySubmittedReview) {
    throw new CustomError.BadRequestError('Already submitted review for this lawyer');
  }

  const review = await reviewService.createReview({
    lawyer: lawyerId,
    user: userId,
    rating,
    comment,
  });
  res.status(StatusCodes.CREATED).json({ review });
};

// ** ===================  GET ALL REVIEWS  ===================
const getAllReviews = async (req, res) => {
  const reviews = await reviewService.findAllReviews();
  res.status(StatusCodes.OK).json({ total_reviews: reviews.length, reviews });
};

// ** ===================  GET SINGLE REVIEW  ===================
const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await reviewService.findReviewById(reviewId);
  if (!review) {
    throw new CustomError.NotFoundError(`No review with the id ${reviewId}`);
  }
  res.status(StatusCodes.OK).json({ review });
};

// ** ===================  UPDATE REVIEW  ===================
const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;

  const review = await reviewService.findReviewById(reviewId);
  if (!review) {
    throw new CustomError.NotFoundError(`No review with the id ${reviewId}`);
  }

  // Check if the user is authorized to update the review
  if (review.user.toString() !== req.user.userId) {
    throw new CustomError.UnauthorizedError('You are not authorized to update this review');
  }

  const updatedReview = await reviewService.updateReview(reviewId, { rating, title, comment });
  res.status(StatusCodes.OK).json({ msg: 'Success! Review has been updated', updatedReview });
};

// ** ===================  DELETE REVIEW  ===================
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await reviewService.findReviewById(reviewId);
  if (!review) {
    throw new CustomError.NotFoundError(`No review with the id ${reviewId}`);
  }

  // Check if the user is authorized to delete the review
  if (review.user.toString() !== req.user.userId) {
    throw new CustomError.UnauthorizedError('You are not authorized to delete this review');
  }

  await reviewService.deleteReview(reviewId);
  res.status(StatusCodes.OK).json({ msg: 'Success! Review has been deleted' });
};

// ** =================== GET SINGLE LAWYER REVIEW  ===================
const getSingleLawyerReviews = async (req, res) => {
  const { id: lawyerId } = req.params;
  const reviews = await reviewService.findReviewsByLawyer(lawyerId);
  res.status(StatusCodes.OK).json({ total_reviews: reviews.length, reviews });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleLawyerReviews,
};
