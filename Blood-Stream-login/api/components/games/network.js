'use strict'

const express = require('express')

const response = require('../../../network/response')
const Controller = require('./index')
const router = express.Router()

// Internal Functions
const list = (req, res, next) => {
  Controller.list()
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

// Routes
router.get('/', list)
router.get('/:game', get)
router.post('/', upsert)
router.delete('/:game', deleteGame)

module.exports = router
