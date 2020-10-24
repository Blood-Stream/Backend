'use strict'

const express = require('express')

const response = require('../../../network/response')
const passport = require('passport')
const Controller = require('./index')
const router = express.Router()
const config = require('../../../../config/config')
const boom = require('@hapi/boom')

require('../../../utils/auth/strategies/google')
require('../../../utils/auth/strategies/twitter')
require('../../../utils/auth/strategies/googleOAuth')

// Internal Functions
const list = (req, res, next) => {
  Controller.list()
  .then((lista) => {
    response.success(req, res, lista, 200)
  })
  .catch(next)
}

const get = (req, res, next) => {
  Controller.get(req.params.nickname)
  .then((user) => {
    response.success(req, res, user, 200)
  })
  .catch(next)
}

const upsert = (req, res, next) => {
  Controller.upsert(req.body)
  .then((user) => {
    response.success(req, res, user, 201)
  })
  .catch(next)
}

const deleteTable = (req, res, next) => {
  Controller.deleteTable(req.params.nickname)
  .then((user) => {
    response.success(req, res, user, 200)
  })
  .catch(next)
}

const providerExtern = (req, res, next) => {
  const { body } = req
  const { apiKeyToken, ...user } = body

  //if(!apiKeyToken) {
    //next(boom.unauthorized('apiKeyToken is required'))
//  }

  Controller.createOrUpdateUser({ user })
    .then ((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
}

const googleAuth = (req, res, next) => {
  console.log(req)
  if (!req.user) next(boom.unauthorized())
  const { token, ...user } = req.user
  /* res.cookie("token", token, {
    httpOnly: !config(false).dev,
    secure: !config(false).dev
  }) */
  res.status(200).json(user)
}

const twitterAuth = (req, res, next) => {
  if(!req.user) next(boom.unauthorized())
  const { token, ...user } = req.user
  /* res.cookie('token', token, {
    httpOnly: !config(false).dev,
    secure: !config(false).dev
  }) */
  res.status(200).json(user)
}

// Routes

router.get('/auth/google2')
router.get('/auth/google', passport.authenticate(('google', {
  scope: ['email', 'profile', 'openid']
})))

router.get('/auth/googleOAuth')
//router.get('/auth/googleOAuth', passport.authenticate('googleOAuth', {
//  scope: [ 'email', 'profile', 'openid' ]
//}))
router.get('/auth/google/callback', googleAuth)
router.get('/auth/twitter')
router.get('/auth/twitter/callback', twitterAuth)
router.get('/', list)
router.get('/:nickname', get)
router.post('/', upsert)
router.delete('/:nickname', deleteTable)
router.post('/sign-provider', providerExtern)

module.exports = router
