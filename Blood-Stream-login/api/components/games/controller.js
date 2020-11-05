
'use strict'

const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')

module.exports = (injectedStore) => {
  const store = injectedStore

  const list = async (page) => {
    const pageSize = 15
    const { Games } = await store(config(false)).catch(utils.handleFatalError)
    const game = await Games.findAll(page, pageSize).catch(utils.handleFatalError)

    return game
  }

  const get = async (name) => {
    let array = []
    let value = null

    const { Games, PlatformGames, Platform, LenguagesGames, GenresGames, Genres, Lenguages } = await store(config(false)).catch(utils.handleFatalError)

    const game = await Games.findByName(name).catch(utils.handleFatalError)
    const genre = await GenresGames.findByGame(game.id).catch(utils.handleFatalError)
    const lenguage = await LenguagesGames.findByGame(game.id).catch(utils.handleFatalError)
    const platform = await PlatformGames.findByGame(game.id).catch(utils.handleFatalError)
    for (const element in genre) {
      const el = genre[element]
      value = await Genres.findById(el.genreId).catch(utils.handleFatalError)
      value = {
        uuid: value.uuid,
        Genre: value.Genre
      }
      array = array.concat(value)
    }

    game.genre = array
    array = []

    for (const element in lenguage) {
      const el = lenguage[element]
      value = await Lenguages.findById(el.lenguageId).catch(utils.handleFatalError)
      value = {
        uuid: value.uuid,
        Lenguages: value.Lenguages
      }
      array = array.concat(value)
    }

    game.lenguages = array

    array = []

    for (const element in platform) {
      const el = platform[element]
      value = await Platform.findById(el.platformId).catch(utils.handleFatalError)
      value = {
        uuid: value.uuid,
        Platform: value.Platform
      }
      array = array.concat(value)
    }

    game.platform = array

    return game
  }
  
  const getByGroup = async (game, page) => {
    const pageSize = 15
    const { Games } = await store(config(false)).catch(utils.handleFatalError)
    let games = await Games.findByName(game).catch(utils.handleFatalError)
    games = await Games.findAllGroup(games.group, page, pageSize).catch(utils.handleFatalError)
    return games
  }

  const getByPopular = async (page) => {
    const pageSize = 15
    const { Games } = await store(config(false)).catch(utils.handleFatalError)
    const games = await Games.findAllPopular(page, pageSize).catch(utils.handleFatalError)
    return games
  }
  // TO DO
  /*const upsert = async (body) => {
  
  }

  const deleteGame = async (game) => {
    console.log('Works')
  }*/

  return {
    list,
    get,
    getByPopular,
    // upsert,
    // deleteGame,
    getByGroup
  }
}
