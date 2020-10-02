'use strict'

const debug = require('debug')('Blood-Stream:db:setup')

module.exports = function config (configExtra) {
  let config = null

  if (configExtra) {
    config = {
      database: process.env.DB_NAME || 'bloodstreamdb',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'master01',
      host: process.env.DB_HOST || 'database-1.cpchb6koet7f.us-east-2.rds.amazonaws.com',
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      loggin: s => debug(s),
      setup: true
    }
  } else {
    config = {
      database: process.env.DB_NAME || 'bloodstreamdb',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'master01',
      host: process.env.DB_HOST || 'database-1.cpchb6koet7f.us-east-2.rds.amazonaws.com',
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
	    dialect: 'postgres',
      logging: s => debug(s)
    }
  }

  return config
}
