'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupGenresModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('genres', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Genre: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['Genre']
      }
    ]
  })
}
