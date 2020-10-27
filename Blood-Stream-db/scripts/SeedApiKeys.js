/**
 * Usar el siguiente codigo desde la terminal
 * situado en la carpeta principal
 * para crear juegos en la base de datos
 *
 * DEBUG=app:* node Blood-Stream-db/scripts/SeedApiKeys.js
 */

'use strict'

const chalk = require('chalk')
const crypto = require('crypto')
const debug = require('debug')('app:scripts:api-keys')
const utils = require('../utils/index')

const db = require('../index')
const config = require('../../config/config')

const adminScopes = [
  'signin: auth',
  'signup: auth',
  'read: user',
  'create: user',
  'update: user',
  'delete: user',
  'read: game',
  'create: game',
  'update: game',
  'delete: game'
]

const masterScopes = [
  'signin: auth',
  'signup: auth',
  'read: user',
  'create: user',
  'update: user',
  'delete: user',
  'read: game',
  'create: game',
  'update: game',
  'delete: game'
]

const publicScopes = [
  'signin: auth',
  'signup: auth',
  'read: user',
  'create: user',
  'update: user',
  'delete: user',
  'read: game',
]

// token: generateRandomToken(),
const apiKeys = [
  {
    token: '70ea77940dced9942c68d4b62a0f21f4e09b8c14cd3dc8136d4300cf14bdd2fb',
    scopes: adminScopes
  },
  {
    token: '902962959754d8d60f57265eaede64d3e4a4797d9144f1ce157c3117df0163b0',
    scopes: publicScopes
  },
  {
    token: generateRandomToken(),
    scopes: masterScopes
  }
]

function generateRandomToken () {
  const buffer = crypto.randomBytes(32)
  return buffer.toString('hex')
}

const seedApiKey = async () => {
  try {
    const { ApiKey } = await db(config(false)).catch(utils.handleFatalError)
    let scopesApiKey = null
    for (const element in apiKeys) {
      const scope = apiKeys[element]
      scopesApiKey = await ApiKey.createOrUpdate(scope).catch(utils.handleFatalError)
      console.log(scopesApiKey)
    }
  } catch (err) {
    debug(chalk.red.err)
    process.exit(1)
  }
}

seedApiKey()
