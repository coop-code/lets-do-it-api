//External requires
const jwt = require('jsonwebtoken');

//Internal requires
let {
    CreateUserDto,
    GetUserDto
} = require('./models/user.dto');
const usersRepository = require('./users.repository.js');
const userValidation = require('./validations/users.validation');
const config = require('../config/main');

const generateToken = (user) => {
    return jwt.sign(user, config.secret, {
        expiresIn: 10080 // in seconds
    });
}

const Insert = async(user, next) => {
    try {
        //Validate user information
        await userValidation.ValidateUser(user);
        const userFromRepo = await usersRepository.Insert(user);

        //Map the user from database model a DTO model and insert the user access token
        let getUserDto = new GetUserDto(userFromRepo);
        getUserDto.token = `JWT ${await generateToken(getUserDto)}`;

        return getUserDto;
    } catch (err) {
        next(err);
    }
}

const Login = async (loginUser,req, res, next) => {
    const token = `JWT ${ generateToken(loginUser)}`;
    return {
        'token': token
    };
}

module.exports.Insert = Insert;
module.exports.Login = Login;