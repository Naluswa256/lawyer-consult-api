const mongoose = require('mongoose');
const logger = require('../config/logger');

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating'],
    },
    comment: {
      type: String,
      required: [true, 'Please provide review text'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure a user can leave only one review per lawyer
reviewSchema.index({ lawyer: 1, user: 1 }, { unique: true });

// Static method to calculate average rating and number of reviews for a lawyer
reviewSchema.statics.calculateAverageRating = async function (lawyerId) {
  const result = await this.aggregate([
    { $match: { lawyer: lawyerId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    const averageRating = result[0] && result[0].averageRating ? Math.ceil(result[0].averageRating) : 0;
    const numOfReviews = result[0] && result[0].numOfReviews ? result[0].numOfReviews : 0;

    await this.model('User').findByIdAndUpdate(lawyerId, {
      averageRating,
      numOfReviews,
    });
  } catch (error) {
    logger.info(error);
  }
};

reviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.lawyer);
});

reviewSchema.post('remove', async function () {
  await this.constructor.calculateAverageRating(this.lawyer);
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
