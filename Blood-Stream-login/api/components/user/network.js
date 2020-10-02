'use strict'

const express = require('express')

const response = require('../../../network/response')
const Controller = require('./index')
const router = express.Router()

// Routes
router.get('/', list)
router.get('/:nickname', get)
router.post('/', upsert)
router.delete('/:nickname', deleteTable)
// Internal Functions
function list (req, res, next) {
  Controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200)
    })
    .catch(next)
}

function get (req, res, next) {
  Controller.get(req.params.nickname)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
}

function upsert (req, res, next) {
  Controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 201)
    })
    .catch(next)
}

function deleteTable (req, res, next) {
  Controller.deleteTable(req.params.nickname)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
}

module.exports = router
