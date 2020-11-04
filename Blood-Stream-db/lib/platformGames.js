'use strict'

const paginate = require('./pagination')

module.exports = function setupPlatformGames (gamesModel, platformModel, platformGamesModel) {
  async function createOrUpdate (uuidGames, uuidPlatforms, platformsGames) {
    const cond = {
      where: {
        uuid: platformsGames.uuid
      }
    }
    console.log(cond)
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
      Object.assign(platformsGames, { platformId: platform.id })
    }
    const existingusers = await platformGamesModel.findOne(cond)
    console.log(existingusers)
    // console.log(platformsGames)
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

  function findByAllPlatform (platform) {
    return platformGamesModel.findAll({
      where: {
        platformId: platform
      } 
    })
  }
  
  function findByPlatform (platform) {
    return platformGamesModel.findOne({
      where: {
        platformId: platform
      }
    })
  }

  async function findByPlGm (platformId, gameId) {
    return await platformGamesModel.findOne({
      where: {
        platformId: platformId,
        gameId: gameId
      }
    })
  }
  
  async function findByGameAll (platformId, page, pageSize) {
    return await platformGamesModel.findAll(
      paginate(
        {
          where: {
            platformId: platformId 
          }
        },
        {page, pageSize}
      )
    )
  }
  
  async function findByGame (gameId) {
    return await platformGamesModel.findOne({
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
    findByPlatform,
    findByGameAll,
    findByAllPlatform
  }
}
