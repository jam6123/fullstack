
function generateCsrfToken() {
  const csrfToken = crypto.randomUUID()

  return csrfToken
}

module.exports = generateCsrfToken
