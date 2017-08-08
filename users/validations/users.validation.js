//External requires
const Joi = require('joi');

//Internal requires
const usersRepository = require('../users.repository.js');
const createUserSchema = require('./create-user.schema');
const errorNames = require('../../config/error-names');
const CustomError = require('../../middlewares/models/error.dto');

//Internal functions
const checkUsernameDuplicity = async(user) => {
    if (await usersRepository.GetByUsername(user)){
        HandleValidationError("Username already exists");
    }
}

const HandleValidationError = (errorDetails) => {
    let error = new CustomError();
    error.details = errorDetails;
    error.message = "Validation problem";
    error.name = errorNames.UnprocessableEntityError;
    throw error;
}

//External functions
const ValidateUser = async(user) => {
    //Validate required fields
    const validationResult = Joi.validate(user, createUserSchema);

    if (validationResult.error) {
        HandleValidationError(validationResult.error.details);
    }

    await checkUsernameDuplicity(user);
}

module.exports.ValidateUser = ValidateUser;