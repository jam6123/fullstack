const jwt = require('jsonwebtoken')

function createTokenCookie(res, payload) {
  // the expiration time unit in jwt is seconds
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '60s'
  })

  const days = 2

  res.cookie('jwt', token, {
    sameSite: "strict",
    secure: true,
    httpOnly: true,
    // maxAge: days * 24 * 60 * 60 * 1000  //cookie expiration time
    maxAge: 1000 * 60      // 60 seconds
  })
}

module.exports = createTokenCookie

