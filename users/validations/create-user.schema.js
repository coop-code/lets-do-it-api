const Joi = require('joi');

const createUserSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().allow(''),
    email: Joi.string().required(),
    username: Joi.string().required().min(8),
    password: Joi.string().required().min(6)
});

module.exports = createUserSchema;