//External requires
const mongoose = require('mongoose');

//Internal requires
const User = require('./models/user.schema');
const config = require('../config/main');
const connection = require('../middlewares/connection');
const errorNames = require('../config/error-names');
mongoose.Promise = Promise;


const GetByUsername = async(user) => {
    return await User.findOne({
        username: user.username
    }).exec();
}

const Insert = async(user) => {
    const newUser = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        password: user.password

    });
    return await newUser.save();
}

exports.Insert = Insert;
exports.GetByUsername = GetByUsername;