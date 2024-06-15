const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createReviewSchema = {
  body: Joi.object({
    lawyer: Joi.string().required().custom(objectId),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
  }),
};

const updateReviewSchema = {
  body: Joi.object({
    rating: Joi.number().min(1).max(5).optional(),
    title: Joi.string().max(100).optional(),
    comment: Joi.string().optional(),
  }),
};

module.exports = {
  createReviewSchema,
  updateReviewSchema,
};
