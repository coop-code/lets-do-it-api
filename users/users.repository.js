//External requires
const mongoose = require('mongoose');

//Internal requires
const User = require('./models/user.schema');
const config = require('../config/main');
const errorNames = require('../config/error-names');
mongoose.Promise = Promise;


const GetByUsername = async (user) => {
    try {
    await getConnection(config.connectionString);
    return await User.findOne({username : user.username}).exec();
    }
    catch (err) {

    }
}

const Insert = async (user) => {
    const newUser = new User({
        firstName : user.firstName,
        lastName : user.lastName,
        username : user.username,
        password : user.password
    });
    console.log(newUser);
    return await newUser.save(); 
}

/* Private Functions */
function handleConnectionError() {
	throw new Error("Connection Problem");
}

async function getConnection(connectionString) {
	try {
		await mongoose.connect(connectionString);
		let connection = mongoose.connection;
		connection.on("error", handleConnectionError);
		return connection;
	} catch (err) {
		handleConnectionError();
	}
}

exports.Insert = Insert;
exports.GetByUsername = GetByUsername;