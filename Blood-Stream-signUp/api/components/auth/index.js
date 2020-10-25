'use strict'

// const store = require('../../../store/dummy')
const store = require('../../../../Blood-Stream-db/index')
const ctrl = require('./auth-controller')

module.exports = ctrl(store)
