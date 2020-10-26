'use strict'

const express = require('express')
const passport = require('passport')
const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router()
const config = require('../../../../config/config')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const store = require('../../../../Blood-Stream-db/index')
const utils = require('../../../../Blood-Stream-db/utils')

require('../../../utils/auth/strategies/basic')

const login = async (req, res, next) => {
  const { ApiKey } = await store(config(false)).catch(utils.handleFatalError)
  const { apiKeyToken } = req.body
  if (!apiKeyToken) next(boom.unauthorized('apiKeyToken is required'))
  passport.authenticate('basic', (error, user) => {
    if (error || !user) next(boom.unauthorized())

    console.log(req.login)
    req.login(user, { session: false }, async (error) => {
      if (error) next(error)

      const apiKey = await ApiKey.findByToken({ token: apiKeyToken }).catch(utils.handleFatalError) 
      if (!apiKey) next(boom.unauthorized())
      console.log('--------------------------------')
      const { nickname } = user
      console.log(nickname)
      const payload = {
        name: nickname,
        scopes: apiKey.scopes
      }
  
      const token = jwt.sign(payload, config(false).authJwtSecret, {
        expiresIn: '15m'
      })
      console.log(`Esto es el user = ${user}`)
      const data = {
        user: payload.name,
        token: token
      }
      return response.success(req, res, data, 200)
    })
  }) 
// controller.login(req, res, next)
//  .then((token) => {
//    response.success(req, res, token, 200)
//  })
//  .catch(next)
}

const retrievePass = (req, res, next) => {
  controller.retrievePass(req.body.nickname, req.body.password)
  .then((token) => {
    response.success(req, res, token, 201)
  })
  .catch(next)
}

router.post('/login', login) 
router.post('/pass-retrieve', retrievePass)

module.exports = router
