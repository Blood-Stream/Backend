'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupAccessRolModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('accessRol', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Rol: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['Rol']
      }
    ]
  })
}
