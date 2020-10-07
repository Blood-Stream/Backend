'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')
const secret = config.jwt.secret

const sign =  (data) => jwt.sign(data, secret)
const verify = (token) => jwt.verify(token, secret)

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req)
    // comprobation if is the user or not
    console.log(decoded)
    if (decoded.id !== owner) {
      throw error('Not authorized', 401)
    }
  },
  logged: function (req, owner) {
    const decoded = decodeHeader(req)
  }
}

const getToken = (authorization) => {
  if (!authorization) {
    throw error('Missing token')
  }
  if (authorization.indexOf('Bearer ') === -1) {
    throw error('Invalid Format')
  }
  const token = authorization.replace('Bearer ', '')
  return token
}

const decodeHeader = (req) => {
  const authorization = req.headers.authorization || ''
  const token = getToken(authorization)
  const decoded = verify(token)

  req.user = decoded
  return decoded
}

module.exports = {
  sign,
  check
}
