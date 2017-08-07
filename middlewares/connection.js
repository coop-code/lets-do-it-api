//External requires
const mongoose = require('mongoose');

//Internal requires
const config = require('./../config/main')

/* Private Functions */
function handleConnectionError() {
    throw new Error("Connection Problem");
}

const connect = async() => {
    try {
        await mongoose.connect(config.connectionString);
        mongoose.connection.on("error", handleConnectionError);
    } catch (err) {
        handleConnectionError();
    }
}

module.exports.connect = connect;
