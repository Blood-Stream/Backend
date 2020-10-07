'use strict'

exports.success = (req, res, message, status) => {
  const statusCode = status || 200
  const statusMessage = message || ''
  res.status(status).send({
    error: false,
    status: statusCode,
    body: statusMessage
  })
}

exports.error = (req, res, message, status) => {
  const statusCode = status || 500
  const statusMessage = message || 'Internal server error'
  res.status(statusCode).send({
    error: false,
    status: statusCode,
    body: statusMessage
  })
}

// res.header('Access-Control-Allow-Origin', '*')
// res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
// res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
// res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')