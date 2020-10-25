'use strict'

module.exports = function setupLanguagesGames (gamesModel, lenguagesModel, lenguagesGamesModel) {
  async function createOrUpdate (uuidGames, uuidLenguages, lenguagesGames) {
    const cond = {
      where: {
        uuid: lenguagesGames.uuid
      }
    }

    const games = await gamesModel.findOne({
      where: {
        uuid: uuidGames
      }
    })
    const lenguages = await lenguagesModel.findOne({
      where: {
        uuid: uuidLenguages
      }
    })

    if (games) {
      Object.assign(lenguagesGames, { gameId: games.id })
    }
    if (lenguages) {
      Object.assign(lenguagesGames, { lenguageId: lenguages.id })
    }

    const existingusers = await lenguagesGamesModel.findOne(cond)
    if (existingusers) {
      const updated = await lenguagesGamesModel.update(lenguagesGames, cond)
      return updated ? lenguagesGamesModel.findOne(cond) : existingusers
    }

    const result = await lenguagesGamesModel.create(lenguagesGames)
    return result.toJSON()
  }

  function findById (id) {
    return lenguagesGamesModel.findOne({
      where: {
        id
      }
    })
  }

  async function findByLnGm (lenguagesId, gameId) {
    return await lenguagesGamesModel.findOne({
      where: {
        lenguageId: lenguagesId,
        gameId: gameId
      }
    })
  }

  async function findByGame (gameId) {
    return await lenguagesGamesModel.findAll({
      where: {
        gameId: gameId
      }
    })
  }

  function findByUuid (uuid) {
    return lenguagesGamesModel.findOne({
      where: {
        uuid
      }
    })
  }

  function findAll () {
    return lenguagesGamesModel.findAll()
  }

  async function deleteById (id) {
    return await lenguagesGamesModel.destroy({
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
    findByLnGm,
    findByGame
  }
}
