const Joi = require('joi');

const updateUserSchema = Joi.object({
  fullNames: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  location: Joi.string().optional(),
  isProfilePublic: Joi.boolean().optional(),
  availableForWork: Joi.boolean().optional(),
  specializations: Joi.array().items(Joi.string()).optional(),
  availableSlots: Joi.array()
    .items(
      Joi.object({
        day: Joi.string().required(),
        timeSlots: Joi.array().items(Joi.string()).required(),
      })
    )
    .optional(),
  employmentHistory: Joi.array()
    .items(
      Joi.object({
        companyName: Joi.string().required(),
        jobTitle: Joi.string().required(),
        description: Joi.string().optional(),
        startMonth: Joi.string().required(),
        startYear: Joi.number().required(),
        endMonth: Joi.string().optional(),
        endYear: Joi.number().optional(),
        isCurrent: Joi.boolean().optional(),
      })
    )
    .optional(),
  education: Joi.array()
    .items(
      Joi.object({
        institutionName: Joi.string().required(),
        degree: Joi.string().required(),
        fieldOfStudy: Joi.string().required(),
        startYear: Joi.number().required(),
        endYear: Joi.number().optional(),
        currentlyAttending: Joi.boolean().optional(),
      })
    )
    .optional(),
  socialMediaLinkedAccounts: Joi.array()
    .items(
      Joi.object({
        platform: Joi.string().required(),
        url: Joi.string().re(),
      })
    )
    .optional(),
});

module.exports = {
  updateUserSchema,
};
