const Joi = require('joi');

const patchTaskSchema = Joi.object().keys({
    //Title and priority are required fields
    //Description and Comments are optional
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    comments: Joi.string().allow(''),
    priority: Joi.boolean().required(),
    deadlineDate: Joi.date().iso().allow(''),
    done: Joi.boolean().required()
});

module.exports = patchTaskSchema;