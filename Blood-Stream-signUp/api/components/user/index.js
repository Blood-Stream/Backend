'use strict'

const store = require('../../../../Blood-Stream-db/index')
const ctrl = require('./user-controller')

module.exports = ctrl(store)