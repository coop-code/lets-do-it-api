const Joi = require('joi');

const postTaskSchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    comments: Joi.string().allow(''),
    deadlineDate: Joi.date().iso().allow(null),
    priority: Joi.boolean().required()
});

module.exports = postTaskSchema;