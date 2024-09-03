const { body } = require('express-validator');
const { ApiError } = require('../utils/ApiError');
const code = require('../constant/errorCode');
const { StatusCodes } = require('http-status-codes');

// Some chain methods will convert non-string value to string like ".escape(), .trim()".
// I think we don't need to use ".bail()" chain because throwing error will automatically stop the execution.
// You can you ".escape()"" to transform html syntax to avoid xss
const validateLoginData = [
  // email
  body('email')
    .notEmpty()
    .withMessage(() => { throw new ApiError(code.RECIEVED_EMPTY_FIELD, StatusCodes.BAD_REQUEST); })
    .isString()
    .withMessage(() => { throw new ApiError(code.INVALID_DATA_FORMAT, StatusCodes.BAD_REQUEST); })
    .isEmail()
    .withMessage(() => { throw new ApiError(code.INVALID_EMAIL, StatusCodes.BAD_REQUEST); })
    .trim(),

  // password
  body('password')
    .notEmpty()
    .withMessage(() => { throw new ApiError(code.RECIEVED_EMPTY_FIELD, StatusCodes.BAD_REQUEST); })
    .isString()
    .withMessage(() => { throw new ApiError(code.INVALID_DATA_FORMAT, StatusCodes.BAD_REQUEST); })
    .trim()
];

// ==================================================================================================================================

const validateSignupData = [
  // username
  body('username')
    .notEmpty()
    .withMessage(() => { throw new ApiError(code.RECIEVED_EMPTY_FIELD, StatusCodes.BAD_REQUEST); })
    .isString()
    .isAlphanumeric()
    .withMessage(() => { throw new ApiError(code.INVALID_DATA_FORMAT, StatusCodes.BAD_REQUEST); })
    .trim(),

  // email
  body('email')
    .notEmpty()
    .withMessage(() => { throw new ApiError(code.RECIEVED_EMPTY_FIELD, StatusCodes.BAD_REQUEST); })
    .isString()
    .withMessage(() => { throw new ApiError(code.INVALID_DATA_FORMAT, StatusCodes.BAD_REQUEST); })
    .isEmail()
    .withMessage(() => { throw new ApiError(code.INVALID_EMAIL, StatusCodes.BAD_REQUEST); })
    .trim(),

  // password
  body('password')
    .notEmpty()
    .withMessage(() => { throw new ApiError(code.RECIEVED_EMPTY_FIELD, StatusCodes.BAD_REQUEST); })
    .isString()
    .withMessage(() => { throw new ApiError(code.INVALID_DATA_FORMAT, StatusCodes.BAD_REQUEST); })
    .trim()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage(() => { throw new ApiError(code.WEAK_PASSWORD, StatusCodes.BAD_REQUEST); }),

  // confirmPassword
  body('confirmPassword')
    .notEmpty()
    .withMessage(() => { throw new ApiError(code.RECIEVED_EMPTY_FIELD, StatusCodes.BAD_REQUEST); })
    .custom((value, { req }) => value === req.body.password)
    .withMessage(() => { throw new ApiError(code.PASSWORD_NOT_MATCH, StatusCodes.BAD_REQUEST); }),
];

module.exports = { validateLoginData, validateSignupData };