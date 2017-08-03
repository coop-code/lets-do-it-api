const Joi = require('joi');

const createUserSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().allow(''),
    username: Joi.string().required().min(6),
    password: Joi.string().required().min(6)
});

module.exports = createUserSchema;