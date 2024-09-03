const { StatusCodes } = require("http-status-codes");
const { ApiError } = require("../utils/ApiError");
const code = require('../constant/errorCode')

function notFoundHandler(req, res) {
  throw new ApiError(code.INVALID_URL, StatusCodes.NOT_FOUND);
}

module.exports = notFoundHandler