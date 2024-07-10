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
const appointmentSchema = {
  body: Joi.object({
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
  body: Joi.object({
    status: Joi.string().required().valid('confirmed', 'rejected'),
  }),
};

const deleteIssue = {
  params: Joi.object({
    issueId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  appointmentSchema,
  updateAppointmentStatus,
  deleteIssue,
};
