//External requires
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');

//Internal requires
let {
    CreateUserDto,
    GetUserDto,
    LoginUserDto
} = require('./models/user.dto');
const usersService = require('./users.service');


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const requireLogin = passport.authenticate('local', { session: false });

const postUserAsync = async(req, res, next) => {
    const createUserDto = new CreateUserDto(req.body);
    const user = await usersService.Insert(createUserDto, next);
    res.status(201).send(user);
}

const loginUserAsync = async(req, res, next) => {
    const loginUserDto = new LoginUserDto(req.body);
    const user = await usersService.Login(loginUserDto, next);
    res.status(200).send(user);
}

router.route('/').post(postUserAsync);
router.route('/login').post(requireLogin, loginUserAsync);

module.exports = router;