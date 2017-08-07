//External requires
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let Joi = require('joi');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

//Internal requires
let {
    CreateUserDto,
    GetUserDto
} = require('./models/user.dto');
var usersRepository = require('./users.repository.js');
let createUserSchema = require('./validations/create-user.schema');
const errorNames = require('../config/error-names');
const config = require('../config/main');

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

const generateToken = (user) => {
    return jwt.sign(user, config.secret, {
        expiresIn: 10080 // in seconds
    });
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
                const getUser = new GetUserDto(user);
                res.status(201).send({
                    token: `JWT ${generateToken(getUser)}`,
                    user: getUser
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

const login = (req, res, next) => {

    let userInfo = new GetUserDto(req);

    res.status(200).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
    });
}

router.route('/').post(postUserAsync);
router.route('/login').post(login);

module.exports = router;