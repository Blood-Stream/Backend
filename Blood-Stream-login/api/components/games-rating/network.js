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

// Routes
router.get('/', list)
router.get('/:game&:user', get)
router.post('/', upsert)
router.delete('/:games&:user', deleteGamesRating)

module.exports = router