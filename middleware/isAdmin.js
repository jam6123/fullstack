const { ApiError } = require("../utils/ApiError")
const code = require("../constant/errorCode")
const { StatusCodes } = require("http-status-codes")

function isAdmin(req, res, next) {
  if(!req.verifiedToken.isAdmin) {
    throw new ApiError(code.NOT_ADMIN, StatusCodes.UNAUTHORIZED)
  }

  next()
}

module.exports = isAdmin 