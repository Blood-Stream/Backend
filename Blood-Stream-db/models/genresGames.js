'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupGenresGamesModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('genresGames', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}
