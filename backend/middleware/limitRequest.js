const { rateLimit } = require('express-rate-limit');
const { ApiError } = require('../utils/ApiError');
const code = require('../constant/errorCode');
const { StatusCodes } = require('http-status-codes');

const limitRequest = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // 5 attempts
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  // legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  skipSuccessfulRequests: true,
  handler: () => {
    throw new ApiError(code.TOO_MANY_ATTEMPTS, StatusCodes.TOO_MANY_REQUESTS);
  }
});

module.exports = limitRequest;