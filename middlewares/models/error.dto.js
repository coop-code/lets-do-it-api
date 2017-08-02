module.exports = class CustomError {
    constructor(status = 500, message = "Unexpected Error. Please try again later.")  {
        this.status = status;
        this.message = message;
        this.details = [];
    }
}