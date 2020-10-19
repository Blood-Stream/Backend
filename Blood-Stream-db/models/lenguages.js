'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupLenguagesModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('lenguages', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Lenguages: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Icon: {
      type: Sequelize.STRING,
      allowNull: false
    },
    indexes: {
      unique: true,
      fields: ['Lenguages']
    }
  })
}
