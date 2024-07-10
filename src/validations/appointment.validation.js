const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Custom validation function to limit the number of words
const maxWords = (value, max, helpers) => {
  const wordCount = value.split(' ').length;
  if (wordCount > max) {
    return helpers.error('string.maxWords', { max });
  }
  return value;
};

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().optional().valid('customer', 'admin', 'lawyer'),
    fullNames: Joi.string().required(),
  }),
};

const appointmentSchema = {
  body: Joi.object().keys({
    lawyerId: Joi.string().required().custom(objectId),
    appointmentType: Joi.string().required().valid('videoCall', 'voiceCall', 'physicalMeeting'),
    date: Joi.date().iso().required(),
    startTime: Joi.date().iso().required(),
    endTime: Joi.date().iso().required(),
    topic: Joi.string().required(),
    notes: Joi.string()
      .optional()
      .custom((value, helpers) => maxWords(value, 100, helpers), 'custom word limit validation'),
    isAnonymous: Joi.boolean().required(),
  }).messages({
    'string.maxWords': '"notes" must not exceed {#max} words',
  }),
};

const updateAppointmentStatus = {
  body: Joi.object().keys({
    status: Joi.string().required().valid('confirmed', 'rejected'),
  }),
};

const deleteIssue = {
  params: Joi.object().keys({
    issueId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  register,
  appointmentSchema,
  updateAppointmentStatus,
  deleteIssue,
};
