const jwt = require('jsonwebtoken')

function createTokenCookie(res, payload) {
  // We used this variable so both cookie and jwt have the same expiration time.
  const TIME_IN_SECONDS = 180;

  // the expiration time unit in jwt is seconds
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: `${TIME_IN_SECONDS}s`
  })

  res.cookie('jwt', token, {
    sameSite: "lax",
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * TIME_IN_SECONDS      
  })
}

module.exports = createTokenCookie

