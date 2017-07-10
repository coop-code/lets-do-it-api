const Joi = require('joi');

const postTaskSchema = Joi.object().keys({
    //Title and priority are required fields
    //Description and Comments are optional
    title: Joi.string().required(),
    description: Joi.string(),
    comments: Joi.string(),
    priority: Joi.boolean().required()
});

module.exports = postTaskSchema;