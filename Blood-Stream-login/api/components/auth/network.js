'use strict'

const express = require('express')
const passport = require('passport')
const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router()
const config = require('../../../../config/config')
const boom = require('@hapi/boom')
require('../../../utils/auth/strategies/google')
require('../../../utils/auth/strategies/twitter')

const login = (req, res, next) => {
  controller.login(req.body.nickname, req.body.password)
  .then((token) => {
    response.success(req, res, token, 200)
  })
  .catch(next)
}

const retrievePass = (req, res, next) => {
  controller.retrievePass(req.body.nickname, req.body.password)
  .then((token) => {
    response.success(req, res, token, 201)
  })
  .catch(next)
}

const googleAuth = (req, res, next) => {
  console.log(req)
  if (!req.user) next(boom.unauthorized())
  const { token, ...user } = req.user
  /* res.cookie("token", token, {
    httpOnly: !config(false).dev,
    secure: !config(false).dev
  }) */
  res.status(200).json(user)
}

const twitterAuth = (req, res, next) => {
  if(!req.user) next(boom.unauthorized())
  const { token, ...user } = req.user
  /* res.cookie('token', token, {
    httpOnly: !config(false).dev,
    secure: !config(false).dev
  }) */
  res.status(200).json(user)
}

router.post('/auth/google')
router.post('/auth/google/callback', googleAuth)
router.get('/auth/twitter')
router.get('/auth/twitter/callback', twitterAuth)
router.post('/login', login)
router.post('/pass-retrieve', retrievePass)

module.exports = router
