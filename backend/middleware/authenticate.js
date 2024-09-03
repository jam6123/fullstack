const { StatusCodes } = require('http-status-codes');
const RevokedToken = require('../models/revokedTokenModel');
const verifyToken = require('../utils/verifyToken');
const { ApiError } = require('../utils/ApiError');
const code = require('../constant/errorCode');

async function authenticate(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    throw new ApiError(code.INVALID_TOKEN, StatusCodes.UNAUTHORIZED);
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    await RevokedToken.deleteOne({ token });
    throw new ApiError(code.INVALID_TOKEN, StatusCodes.UNAUTHORIZED);
  }

  // check if the submitted token is listed in revoked tokens
  const foundListedToken = await RevokedToken.findOne({ token });
  if (foundListedToken) throw new ApiError(code.INVALID_TOKEN, StatusCodes.UNAUTHORIZED);

  req.verifiedToken = decoded;
  next();
}

module.exports = authenticate;
