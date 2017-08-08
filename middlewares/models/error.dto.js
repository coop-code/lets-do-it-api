module.exports = class CustomError extends Error {
    constructor(status = 500, message = "Unexpected Error. Please try again later.")  {
        super();
        this.status = status;
        this.message = message;
        this.details = [];
    }
}