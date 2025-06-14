const jwt = require('jsonwebtoken')

function verifyToken(token) {
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    decoded = null
    console.error(`Token verification failed: ${error.message}`);
  }

  return decoded
}

module.exports = verifyToken