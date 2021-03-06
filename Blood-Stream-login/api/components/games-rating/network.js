'use strict'

const express = require('express')
const passport = require('passport')
const response = require('../../../network/response')
const Controller = require('./index')
const router = express.Router()

require('../../../utils/auth/strategies/jwt')

// Internal Functions
const get = (req, res, next) => {
  Controller.get(req.params.page)
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

const deleteGamesRating = (req, res, next) => {
  Controller.deleteGamesRating(req.params.games, req.params.user)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
}

// Routes
router.get('/get/:page', passport.authenticate('jwt', { session: false }), get)
router.post('/', passport.authenticate('jwt', { session: false }), upsert)
router.delete('/:games&:user', passport.authenticate('jwt', { session: false }), deleteGamesRating)

module.exports = router
