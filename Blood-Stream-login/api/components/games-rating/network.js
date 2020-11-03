'use strict'

const express = require('express')
const passport = require('passport')
const response = require('../../../network/response')
const Controller = require('./index')
const router = express.Router()

require('../../../utils/auth/strategies/jwt')

// Internal Functions
const list = (req, res, next) => {
  Controller.list()
  .then((lista) => {
    response.success(req, res, lista, 200)
  })
  .catch(next)
}

const get = (req, res, next) => {
  Controller.get(req.body)
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
  Controller.deleteGamesRating(req.params.nickname)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
  }

const listMostPopulars = (req, res, next) => {
  Controller.listMostPopulars()
  .then((most) => {
    response.success(req, res, most, 200)
  })
  .catch(next)
}

const bestGamesByCommunity = (req, res, next) => {
  Controller.bestGamesByCommunity()
  .then((best) => {
    response.success(req, res, best, 200)
  })
  .catch(next)
}



// Routes
router.get('/', passport.authenticate('jwt', { session: false }), list)
router.get('/:game&:user', passport.authenticate('jwt', { session: false }), get)
router.post('/', passport.authenticate('jwt', { session: false }), upsert)
router.delete('/:games&:user', passport.authenticate('jwt', { session: false }), deleteGamesRating)

router.get('/mostPopularGames', listMostPopulars)
router.get('/bestGamesByCommunity', bestGamesByCommunity)

module.exports = router
