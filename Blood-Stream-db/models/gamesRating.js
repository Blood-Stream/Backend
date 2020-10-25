'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupGamesRatingModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('gamesRating', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Review: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    Like_Post: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    Rating: {
      type: Sequelize.FLOAT,
      allowNull: true
    }
  })
}
