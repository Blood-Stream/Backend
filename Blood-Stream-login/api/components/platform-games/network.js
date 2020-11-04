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

const deletePlatform = (req, res, next) => {
  Controller.deletePlatform(req.params.nickname)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
  }

const gamesByPlatforms2 = (req, res, next) => {
  Controller.gamesByPlatforms2(req.params.platform, req.params.page)
    .then((game) => {
      response.success(req, res, game, 200)
    })
    .catch(next)
}

const gamesByPlatforms = (req, res, next) => {
  Controller.gamesByPlatforms(req.params.game, req.params.page)
    .then((game) => {
      response.success(req, res, game, 200)
    })
    .catch(next)
}
// Routes
router.get('/', passport.authenticate('jwt', { session: false }), list)
router.post('/', passport.authenticate('jwt', { session: false }), upsert)
router.delete('/:games&:lenguage', passport.authenticate('jwt', { session: false }), deletePlatform)
router.get('/:game&:page', passport.authenticate('jwt', { session: false }), gamesByPlatforms)
router.get('/platform/:platform&:page', passport.authenticate('jwt', { session: false }), gamesByPlatforms2)

module.exports = router
