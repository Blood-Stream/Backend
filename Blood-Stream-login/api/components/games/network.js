'use strict'

const express = require('express')
const passport = require('passport')
const response = require('../../../network/response')
const Controller = require('./index')
const router = express.Router()
const scopesValidationHandler = require('../../../utils/middleware/scopeValidation')

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
  Controller.get(req.params.game)
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

const deleteGame = (req, res, next) => {
  Controller.deleteGame(req.params.game)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
  }

const getGamesByGroup = (req, res, next) => {
  Controller.getByGroup(req.params.game, req.params.page)
    .then((game) => {
      response.success(req, res, game, 200)
    })
    .catch(next)
}

const getGamesByPopular = (req, res, next) => {
  Controller.getByPopular(req.params.page)
    .then((game) => {
      response.success(req, res, game, 200)
    })
    .catch(next)
}

// Routes
router.get('/:page', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['read: game']), list)
router.get('/get/:game', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['read: game']), get)
router.post('/', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['update: game']), upsert)
router.get('/group/:game&:page', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['read: game']), getGamesByGroup)
router.delete('/:game', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['delete: game']), deleteGame)
router.get('/popular/:page', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['read: game']), getGamesByPopular)

module.exports = router
