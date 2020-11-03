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

const deleteLenguage = (req, res, next) => {
  Controller.deleteLenguage(req.params.nickname)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
  }

const lnList = (req, res, next) => {
  Controller.lnList(req.params.ln, req.params.page, req.params.pageSize)
    .then((game) => {
      response.success(req, res, game, 200)
    })
    .catch(next)
}
// Routes
router.get('/', passport.authenticate('jwt', { session: false }), list)
router.post('/', passport.authenticate('jwt', { session: false }), upsert)
router.delete('/:games&:lenguage', passport.authenticate('jwt', { session: false }), deleteLenguage)
router.get('/ln/:ln&:page&:pageSize', passport.authenticate('jwt', { session: false }), lnList)

module.exports = router
