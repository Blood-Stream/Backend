'use strict'

const express = require('express')

const response = require('../../../network/response')
const Controller = require('./index')
const router = express.Router()

// Internal Functions
const list = (req, res, next) => {
  Controller.list(req.params.page, req.params.pageSize)
  .then((lista) => {
    response.success(req, res, lista, 200)
  })
  .catch(next)
}

const get = (req, res, next) => {
  Controller.get(req.params.nickname)
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

const deleteTable = (req, res, next) => {
  Controller.deleteTable(req.params.nickname)
  .then((user) => {
    response.success(req, res, user, 200)
  })
  .catch(next)
}

// Routes
router.get('/:page&:pageSize', list)
router.get('/:nickname', get)
router.post('/', upsert)
router.delete('/:nickname', deleteTable)

module.exports = router
