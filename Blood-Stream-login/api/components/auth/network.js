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
require('../../../utils/auth/strategies/jwt')

const login = async (req, res, next) => {
  const { apiKeyToken } = req.body
  if (!apiKeyToken) next(boom.unauthorized('apiKeyToken is required'))
  passport.authenticate('basic', (error, user) => {
      try {
        if (error || !user) next(boom.unauthorized())
        const data = req.login(user, { session: false }, async (error) => {
          const { ApiKey } = await store(config(false)).catch(utils.handleFatalError)
          if (error) next(error)
          const apiKey = await ApiKey.findByToken(apiKeyToken).catch(utils.handleFatalError) 
          if (!apiKey) next(boom.unauthorized())
          const { Nickname } = user
          const email = user.contactId.email

          const payload = {
            Nickname,
            email,
            scopes: apiKey.scopes
          }
          const token = jwt.sign(payload, config(false).authJwtSecret, {
            expiresIn: '12h'
          })

          const data = {
            user: user,
            token: token
          }
          return response.success(req, res, data, 200) 
        })
      } catch (err) {
        next(err)
      }
  })(req, res, next)
}

const retrievePass = (req, res, next) => {
  controller.retrievePass(req.body.nickname, req.body.password)
  .then((token) => {
    response.success(req, res, token, 201)
  })
  .catch(next)
}

router.post('/login', login) 
router.post('/pass-retrieve', passport.authenticate('jwt', { session: false }), retrievePass)

module.exports = router
