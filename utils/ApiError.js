/**
 * @description Custom error for handling api errors
 * @param code  - the error code in string format
 * @param statusCode - the http status code in number format
 * @example 
 *    code = "SOMETHING_WENT_WRONG"
 *    statusCode = 400
 */

class ApiError extends Error {
  constructor(code, statusCode) {
    super();

    this.code = code;
    this.statusCode = statusCode;

    // This is not necessary I just put it here.
    Object.defineProperty(this, "name", {
      value: "ApiError",
      writable: false,
      configurable: false
    });
  }
}

module.exports = { ApiError };