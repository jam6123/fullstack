const { StatusCodes } = require('http-status-codes');
const { ApiError } = require('../utils/ApiError');

/*
  When you put four arguments express will automatically identify it as a "error handler".
  Express will call "next(error)" when there's any error in our synchronous middlewares/handlers.
  In async middlewares/handlers we have to call "next(error)" manually, but we use "express-async-errors" so we do NOT need to.
  This will be automatically called when there's any error (produced by next(error)) in our middlewares/handlers, regardless if come from sync or async.
*/
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





