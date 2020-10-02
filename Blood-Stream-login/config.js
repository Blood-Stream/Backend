'use strict'

module.exports = {
  remoteDB: process.env.REMOTE_DB || true,
  api: {
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
    /*
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || '',
    database: process.env.MYSQL_DB || 'bloodstream' */
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
