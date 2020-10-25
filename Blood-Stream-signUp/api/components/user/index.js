'use strict'

const store = require('../../../../Blood-Stream-db/index')
// const store = require('../../../store/dummy')
const ctrl = require('./user-controller')

module.exports = ctrl(store)
