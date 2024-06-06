

const Joi = require('joi');

const createSpecialization = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
  }),
};

module.exports = {
  createSpecialization,
};
