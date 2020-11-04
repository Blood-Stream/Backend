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

const upsert = (req, res, next) => {
  Controller.upsert(req.body)
  .then((user) => {
    response.success(req, res, user, 201)
  })
  .catch(next)
}

const deleteMessage = (req, res, next) => {
  Controller.deleteMessage(req.params.nickname)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
  }

const genreGames = (req, res, next) => {
  Controller.getGameByGenre(req.params.genre, req.params.page)
    .then((game) => {
      response.success(req, res, game, 200)
    })
    .catch(next)
}

// Routes
router.get('/', passport.authenticate('jwt', { session: false }), list)
router.post('/', passport.authenticate('jwt', { session: false }), upsert)
router.delete('/:games&:genre', passport.authenticate('jwt', { session: false }), deleteMessage)
router.get('/genre-games/:genre&:page', passport.authenticate('jwt', { session: false }), genreGames)

module.exports = router
