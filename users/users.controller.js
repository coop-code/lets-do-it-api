//External requires
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let Joi = require('joi');

//Internal requires
let {CreateUserDto} = require('./models/user.dto');
var usersRepository = require('./users.repository.js');
let createUserSchema = require('./validations/create-user.schema');
const errorNames = require('../config/error-names');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


//----------------------------------------//
//Pivate functions
const validationErrorObject = (validationError) => {
    let error = {};
    error.name = errorNames.UnprocessableEntityError;
    error.message = "Validation Error";
    error.details = validationError.details;
    return error;
}

const checkUsernameDuplicity = async(user) => {
    console.log(user);
    return await usersRepository.GetByUsername(user);
}

const postUserAsync = async(req, res, next) => {

    const createUserDto = new CreateUserDto(req.body);

    //User fields validation
    const validationResult = Joi.validate(createUserDto, createUserSchema);
    if (validationResult.error) {
        next(validationErrorObject(validationResult.error));
    } else {
        try {
            if (await checkUsernameDuplicity(createUserDto)) {
                let error = new Error("Username already exists");
                error.name = errorNames.UnprocessableEntityError;
                next(error);
            } else {
                const user = await usersRepository.Insert(createUserDto);
                res.status(201).send(user);
            }
        } catch (error) {
            next(error);
        }
    }
}

router.route('/').post(postUserAsync);

module.exports = router;

