'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupContactModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('apiKeys', {
    token: {
      type: Sequelize.STRING,
      allowNull: false
    },
    scopes: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    }
  })
}
