'use strict'

module.exports = {
  remoteDB: process.env.REMOTE_DB || true,
  api: {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'Login'
  },
  mysql: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'bloodstreamdb'
  },
  mysqlService: {
    port: process.env.MYSQL_SRV_PORT || 3306,
    host: process.env.MYSQL_SRV_HOST || ''
  },
  cacheService: {
    port: process.env.MYSQL_SRV_PORT || 3003,
    host: process.env.MYSQL_SRV_HOST || 'localhost'
  },
  post: {
    port: process.env.POST_PORT || 3002
  },
  redis: {
    host: process.env.REDIS_HOST || '',
    port: process.env.REDI_PORT || '',
    password: process.env.REDIS_PASS || ''
  }
}
