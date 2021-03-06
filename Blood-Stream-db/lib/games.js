'use strict'

const paginate = require('./pagination')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupGames (gamesModel) {
  async function createOrUpdate (games) {
    const cond = {
      where: {
        uuid: games.uuid
      }
    }
    const existingGames = await gamesModel.findOne(cond)
    // existingGames.group = games.group
    if (existingGames) {
      const updated = await gamesModel.update(games, cond)
      return updated ? gamesModel.findOne(cond) : existingGames
    }
    const result = await gamesModel.create(games)
    return result.toJSON()
  }

  async function findById (id) {
    return await gamesModel.findOne({
      where: {
        id
      }
    })
  }

  async function findByUuid (uuid) {
    return await gamesModel.findOne({
      where: {
        uuid
      }
    })
  }

  async function findByUrl (urlGame) {
    return await gamesModel.findOne({
      where: {
        Url_Game: urlGame
      }
    })
  }

  async function findByGroup (id, group) {
    return await gamesModel.findOne({
      where: {
        group,
        id
      }
    })
  }

  async function findByName (Name) {
    return await gamesModel.findOne({
      where: {
        Name
      }
    })
  }

  async function findAllRating (page, pageSize) {
    return await gamesModel.findAll(
      paginate(
        {
          where: {
            Rating: {
              [Op.ne]: null
            }
          },
          order: [
            [
              'Rating',
              'DESC'
            ]
          ]

        },
        { page, pageSize }
      )
    )
  }

  async function findAllPopular (page, pageSize) {
    return await gamesModel.findAll(
      paginate(
        {
          where: {
            count: {
              [Op.ne]: null
            }
          },
          order: [
            [
              'count',
              'DESC'
            ]
          ]

        },
        { page, pageSize }
      )
    )
  }

  async function findAllGroup (group, page, pageSize) {
    return await gamesModel.findAll(
      paginate(
        {
          where: {
            group
          }
        },
        { page, pageSize }
      )
    )
  }

  async function findAll (page, pageSize) {
    return await gamesModel.findAll(
      paginate(
        {
          where: {}
        },
        { page, pageSize }
      )
    )
  }

  async function deleteById (id) {
    return await gamesModel.destroy({
      where: {
        id
      }
    })
  }

  return {
    createOrUpdate,
    findById,
    findByUuid,
    findAll,
    deleteById,
    findByName,
    findByUrl,
    findAllRating,
    findAllGroup,
    findAllPopular,
    findByGroup
  }
}
