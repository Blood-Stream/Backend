'use strict'

const express = require('express')

const response = require('../../../network/response')
const Controller = require('./index')
const router = express.Router()

// Routes
router.get('/message', list)
router.get('/message/:nickname', get)
router.post('/message/', upsert)
router.delete('/message/:nickname', deleteMessage)

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

function deleteMessage (req, res, next) {
  Controller.deleteMessage(req.params.nickname)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
}

module.exports = router
