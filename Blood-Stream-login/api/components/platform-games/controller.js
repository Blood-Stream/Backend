'use strict'

const { nanoid } = require('nanoid')
const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')

module.exports = (injectedStore) => {
  const store = injectedStore

  const list = async () => {
    const { PlatformGames } = await store(config(false)).catch(utils.handleFatalError)
    const platform = await PlatformGames.findAll().catch(utils.handleFatalError)
    return platform
  }

  const upsert = async (body) => {
    const { PlatformGames, Games, Platform } = await store(config(false)).catch(utils.handleFatalError)
    const platform = await Platform.findByPlatform(body.platform).catch(utils.handleFatalError)
    let games = await Games.findByName(body.game).catch(utils.handleFatalError)
    if (!platform || !games) return 'Not exist'
    let platGame = await PlatformGames.findByPlGm(platform.id, games.id).catch(utils.handleFatalError)
    let plGm = {
      uuid: null
    }

    if (platGame === null) {
      plGm.uuid = nanoid()
    } else {
      plGm.uuid = platGame.uuid
    }

    games = {
      id: games.id,
      uuid: games.uuid,
      Url_game: games.Url_Game,
      Name: games.Name,
      Developer: games.Developer
    }
    plGm = await PlatformGames.createOrUpdate(games.uuid, platform.uuid, plGm)

    plGm.platformId = platform
    plGm.gameId = games

    return plGm
  }
  
  const gamesByPlatforms2 = async(platform, page) => {
    const pageSize = utils.totalPage()
    const { Games, PlatformGames, Platform } = await store(config(false)).catch(utils.handleFatalError)
    let platforms = await Platform.findByPlatform(platform).catch(utils.handleFatalError)
    platforms = await PlatformGames.findByGameAll(platforms.id, page, pageSize).catch(utils.handleFatalError) 
    let collection = []
    let games
    for (const element in platforms){
      const el = platforms[element]
      games = await Games.findById(el.gameId).catch(utils.handleFatalError)
      delete games.group
      delete games.createdAt
      delete games.updatedAt
      delete games.id
      collection = collection.concat(games)
    }
    return collection
  }

  const gamesByPlatforms = async(game, page) => {
    const pageSize = utils.totalPage()
    const { Games, PlatformGames } = await store(config(false)).catch(utils.handleFatalError)
    let games = await Games.findByName(game).catch(utils.handleFatalError)
    let platforms = await PlatformGames.findByGame(games.id).catch(utils.handleFatalError)
    platforms = await PlatformGames.findByGameAll(platforms.platformId, page, pageSize).catch(utils.handleFatalError) 
    let collection = []
    for (const element in platforms){
      const el = platforms[element]
      games = await Games.findById(el.gameId).catch(utils.handleFatalError)
      delete games.group
      delete games.createdAt
      delete games.updatedAt
      delete games.id
      collection = collection.concat(games)
    }
    return collection
  }

  //TO DO
  //const deletePlatform = async (platform) => {

  //}

  return {
    list,
    upsert,
    // deletePlatform,
    gamesByPlatforms,
    gamesByPlatforms2,
  }
}
