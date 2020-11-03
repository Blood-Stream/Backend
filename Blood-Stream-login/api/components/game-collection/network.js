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

const deleteGameCollection = (req, res, next) => {
  Controller.deleteGameCollection(req.params.nickname)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
  }
const gamesByCollections = (req, res, next) => {
  Controller.gamesByCollection(req.params.user, req.params.page, req.params.pageSize)
    .then((game) => {
      response.success(req, res, game, 200)
    })
    .catch(next)
}
// Routes
router.get('/', passport.authenticate('jwt', { session: false }), list)
router.get('/:game&:user', passport.authenticate('jwt', { session: false }), get)
router.post('/', passport.authenticate('jwt', { session: false }), upsert)
router.delete('/:games&:user', passport.authenticate('jwt', { session: false }), deleteGameCollection)
router.get('/collections/:user&:page&:pageSize', passport.authenticate('jwt', { session: false }), gamesByCollections)

module.exports = router
