'use strict'

module.exports = (message, code) => {
  const e = new Error(message)

  if (code) {
    e.statusCode = code
  }
  return e
}

