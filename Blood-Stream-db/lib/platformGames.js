'use strict'

module.exports = function setupPlatformGames (gamesModel, platformModel, platformGamesModel) {
  async function createOrUpdate (uuidGames, uuidPlatforms, platformsGames) {
    const cond = {
      where: {
        uuid: platformsGames.uuid
      }
    }

    const games = await gamesModel.findOne({
      where: {
        uuid: uuidGames
      }
    })
    const platform = await platformModel.findOne({
      where: {
        uuid: uuidPlatforms
      }
    })

    if (games) {
      Object.assign(platformsGames, { gameId: games.id })
    }
    if (platform) {
      Object.assign(platformsGames, { platformGameId: platform.id })
    }

    const existingusers = await platformGamesModel.findOne(cond)
    if (existingusers) {
      const updated = await platformGamesModel.update(platformsGames, cond)
      return updated ? platformGamesModel.findOne(cond) : existingusers
    }

    const result = await platformGamesModel.create(platformsGames)
    return result.toJSON()
  }

  function findById (id) {
    return platformGamesModel.findOne({
      where: {
        id
      }
    })
  }

  function findByUuid (uuid) {
    return platformGamesModel.findOne({
      where: {
        uuid
      }
    })
  }

  function findByPlatform (platform) {
    return platformGamesModel.findOne({
      where: {
        platformGameId: platform
      }
    })
  }

  async function findByPlGm (platformId, gameId) {
    return await platformGamesModel.findOne({
      where: {
        platformGameId: platformId,
        gameId: gameId
      }
    })
  }

  async function findByGame (gameId) {
    return await platformGamesModel.findAll({
      where: {
        gameId: gameId
      }
    })
  }

  function findAll () {
    return platformGamesModel.findAll()
  }

  async function deleteById (id) {
    return await platformGamesModel.destroy({
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
    findByGame,
    findByPlGm,
    findByPlatform
  }
}
