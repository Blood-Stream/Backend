'use strict'

const { nanoid } = require('nanoid')
const { use } = require('passport')
const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')

module.exports = (injectedStore) => {
  const store = injectedStore

  const list = async () => {
    const { PlatformGames } = await store(config(false)).catch(utils.handleFatalError)
    const platform = await PlatformGames.findAll().catch(utils.handleFatalError)
    return platform
  }

  const get = async (platform) => {

  }

  const upsert = async (body) => {
    console.log(body)
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
      return 'Exist'
    }

    games = {
      id: games.id,
      uuid: games.uuid,
      Url_game: games.Url_Game,
      Name: games.Name,
      Developer: games.Developer
    }

    plGm = await PlatformGames.createOrUpdate(games.uuid, platform.uuid, plGm)

    plGm.platformGameId = platform
    plGm.gameId = games

    return plGm
  }

  const deletePlatform = async (platform) => {

  }

  return {
    list,
    get,
    upsert,
    deletePlatform
  }
}
