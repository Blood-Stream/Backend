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

const publicScopes = [
  'signin: auth',
  'signup: auth',
  'read: user',
  'create: user',
  'update: user',
  'delete: user',
  'read: game',
]

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes
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
