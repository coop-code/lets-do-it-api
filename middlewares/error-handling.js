const ErrorDto = require('./models/error.dto');
const errorNames = require('../config/error-names');

const errorHandling = (err, req, res, next) => {
    //Creates new Error Dto instance with default values.
    const error = new ErrorDto();
    
    //Not Found Error. Self explanatory error, there's no need to write details 
    if (err.name === errorNames.NotFoundError) {
        error.message = "Not Found";
        error.status = 404;
    } 
    
    //Input validation error. The details object will provide useful information.
    if (err.name === errorNames.UnprocessableEntityError) {
        error.message = err.message;
        error.status = 422;
        error.details = err.details;
    }

    res.status(error.status).send(error);
}

module.exports = errorHandling;