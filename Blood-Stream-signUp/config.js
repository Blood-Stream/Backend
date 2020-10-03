'use strict'

module.exports = {
  remoteDB: process.env.REMOTE_DB || true,
  api: {
    port: process.env.PORT || 3000
  },
  local: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || '',
    database: process.env.MYSQL_DB || 'bloodstream'
  },
  mysqlService: {
    port: process.env.MYSQL_SRV_PORT || 3306,
    host: process.env.MYSQL_SRV_HOST || ''
  },
}
