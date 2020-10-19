'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupMessageModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('message', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Message: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    Post_Like: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  }, 
  {
    indexes: [
      {
        unique: true,
        fields: ['Message']
      }
    ]
  })
}
