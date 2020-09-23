'use strict'

const express = require('express')

const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

// Routes
router.post('/', upsert)

// Internal functions

async function upsert(req, res) {
    try {
        const upsert = await Controller.upsert(req.body);
        response.success(req, res, upsert, 201);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}

module.exports = router
