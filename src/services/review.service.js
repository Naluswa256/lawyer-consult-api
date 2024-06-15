const { Review } = require('../models');

const findReview = async (query) => {
  return Review.findOne(query);
};

const findReviewById = async (reviewId) => {
  return Review.findById(reviewId);
};

const findAllReviews = async () => {
  return Review.find({}).populate({
    path: 'lawyer',
    select: 'fullNames email',
  });
};

const findReviewsByLawyer = async (lawyerId) => {
  return Review.find({ lawyer: lawyerId });
};

const createReview = async (reviewData) => {
  return Review.create(reviewData);
};

const updateReview = async (reviewId, updateData) => {
  return Review.findByIdAndUpdate(reviewId, updateData, { new: true, runValidators: true });
};

const deleteReview = async (reviewId) => {
  return Review.findByIdAndDelete(reviewId);
};

module.exports = {
  findReview,
  findReviewById,
  findAllReviews,
  findReviewsByLawyer,
  createReview,
  updateReview,
  deleteReview,
};
