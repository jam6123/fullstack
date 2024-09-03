const { ApiError } = require('../utils/ApiError')
const { StatusCodes } = require('http-status-codes')
const code = require('../constant/errorCode')


function validateReqBody(req, res, buf, encoding) {
  try {
    JSON.parse(buf);
  } catch(err) {
    throw new ApiError(code.INVALID_JSON_BODY, StatusCodes.BAD_REQUEST);
  }
}

module.exports = validateReqBody