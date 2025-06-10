const crypto = require("crypto");

function generateCsrfToken() {
  const randomBytes = crypto.randomBytes(16).toString("hex");
  const uuid = crypto.randomUUID();
  return `${uuid}-${randomBytes}`;    // Combine UUID and random bytes for higher entropy
}

module.exports = generateCsrfToken
