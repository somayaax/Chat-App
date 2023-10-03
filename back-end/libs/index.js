const asycnWrapper = (promise) => promise
    .then((data) => [undefined, data])
    .catch((error) => [error]);

class BaseError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this);
    }
}

module.exports = {
    asycnWrapper,
    BaseError
}