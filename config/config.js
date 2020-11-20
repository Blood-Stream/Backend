'use strict'
require('dotenv').config()
const debug = require('debug')('Blood-Stream:db:setup')

module.exports = function config (configExtra) {
  const config = {
    dev: process.env.NODE_ENV !== 'production',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
    defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    secret: process.env.SECRET,
    apiUrl: process.env.API_URL,
    adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN,
    publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
    dialect: 'postgres',
    logging: s => debug(s)
  }

  if (configExtra) {
    Object.assign(config, {
      setup: true
    })
  }

  if (process.env.NODE_ENV === 'production') {
    Object.assign(config, {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  }

  return config
}
