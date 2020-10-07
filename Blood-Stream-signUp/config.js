'use strict'

module.exports = {
  api: {
    port: process.env.PORT || 3000
  },
  local: {
    database: process.env.DB_NAME || 'bloodstreamdb',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'password',
    host: process.env.DB_HOST || 'localhost'
  }
}
