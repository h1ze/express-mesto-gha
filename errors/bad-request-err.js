const { BAD_REQUEST_ERROR_CODE } = require('../config/error-codes');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR_CODE;
  }
}

module.exports = BadRequestError;
