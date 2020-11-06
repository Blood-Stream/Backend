'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupGamesModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('games', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Url_Game: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Subtitle: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    Icon_Url: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    Developer: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Age_Rating: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Size: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    Original_Release_Date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    Current_Version_Release_Date: {
      type: Sequelize.DATE,
      allowNull: true
    }/*,
    group: {
      type: Sequelize.INTEGER, 
      allowNull: true,
    },
    Rating: {
      type: Sequelize.INTEGER, 
      allowNull: true,
    },
    count: {
      type: Sequelize.INTEGER, 
      allowNull: true,
    }*/

  },
    {
      indexes: [
        {
          unique: false,
          fields: ['Name']
        }
      ]
    })
}
