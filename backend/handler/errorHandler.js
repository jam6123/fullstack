const { StatusCodes } = require('http-status-codes');
const { ApiError } = require('../utils/ApiError');

// When you put four arguments express will automatically identify it as a "error handler".
// When the "next(error)" function is called this middlware will run.
module.exports = (error, req, res, next) => {
  const { statusCode, code } = error;

  if (error instanceof ApiError) {
    res.status(statusCode).json({
      success: false,
      statusCode,
      error: {
        code
      }
    });

  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        code: "INTERNAL_SERVER_ERROR"
      }
    });

    // just to inform the developer
    console.log(`❌`, error.stack);
  }

}





