'use strict'

module.exports = function setupGamesCollection (gamesCollectionModel, usersModel, gamesModel) {
  async function createOrUpdate (uuidGames, uuidUsers, gamesCollection) {
    const cond = {
      where: {
        uuid: gamesCollection.uuid
      }
    }

    const games = await gamesModel.findOne({
      where: {
        uuid: uuidGames
      }
    })
    const users = await usersModel.findOne({
      where: {
        uuid: uuidUsers
      }
    })

    if (games) {
      Object.assign(gamesCollection, { gameId: games.id })
    }
    if (users) {
      Object.assign(gamesCollection, { userId: users.id })
    }

    const existingusers = await gamesCollectionModel.findOne(cond)
    if (existingusers) {
      const updated = await gamesCollectionModel.update(gamesCollection, cond)
      return updated ? gamesCollectionModel.findOne(cond) : existingusers
    }

    const result = await gamesCollectionModel.create(gamesCollection)
    return result.toJSON()
  }

  async function findById (id) {
    return await gamesCollectionModel.findOne({
      where: {
        id
      }
    })
  }

  async function findByUuid (uuid) {
    return await gamesCollectionModel.findOne({
      where: {
        uuid
      }
    })
  }

  async function findByGame (gameId) {
    return await gamesCollectionModel.findAll({
      where: {
        gameId: gameId
      }
    })
  }

  async function findByUsGm (userId, gameId) {
    return await gamesCollectionModel.findOne({
      where: {
        userId: userId,
        gameId: gameId
      }
    })
  }

  async function findAll () {
    return await gamesCollectionModel.findAll()
  }

  async function deleteById (id) {
    return await gamesCollectionModel.destroy({
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
    findByUsGm,
    findByGame
  }
}
