'use strict'

const express = require('express')

const response = require('../../../network/response')
const Controller = require('./index')
const router = express.Router()
const session = require('express-session')
const passport = require('passport')
const scopesValidationHandler = require('../../../utils/middleware/scopeValidation')

// JWT Strategy
require('../../../utils/auth/strategies/jwt')

// Internal Functions
const list = (req, res, next) => {
  Controller.list(req.params.page)
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

// Routes
router.get('/:page', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['read: user']), list)
router.get('/:nickname', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['read: user']), get)
router.post('/', upsert)
router.delete('/:nickname', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['delete: user']), deleteTable)

module.exports = router
