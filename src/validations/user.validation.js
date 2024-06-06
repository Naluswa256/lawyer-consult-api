const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = Joi.object({
  fullNames: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  location: Joi.string().optional(),
  isProfilePublic: Joi.boolean().optional(),
  availableForWork: Joi.boolean().optional(),
  specializations: Joi.array().items(Joi.string().custom(objectId)).optional(),
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
        url: Joi.string().required(),
      })
    )
    .optional(),
});

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
