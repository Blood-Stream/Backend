'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupAccessRolModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('accessRol', {
    Rol: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Level: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
}
