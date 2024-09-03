const { StatusCodes } = require("http-status-codes");

// CSRF token is meant to protect state changing routes, it's okay if there's no csrf protection on GET routes.

function csrfProtection(req, res, next) {
  const csrfTokenFromCookie = req.verifiedToken.csrfToken;
  const csrfTokenFromHeader = req.headers["xsrf-token"];

  if (csrfTokenFromHeader !== csrfTokenFromCookie) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }

  next();
}

module.exports = csrfProtection; 