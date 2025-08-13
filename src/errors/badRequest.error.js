const BaseError = require("./base.error");
const { StatusCodes } = require("http-status-codes");

class NotFoundError extends BaseError {
  constructor(resourceName, resourceValue) {
    super(
      "NotFoundError",
      StatusCodes.BAD_REQUEST,
      `The requested resource: ${resourceName} with value ${resourceValue} not found`,
      { resourceName, resourceValue }
    );
  }
}

module.exports = NotFoundError;