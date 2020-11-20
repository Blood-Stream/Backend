
'use strict'

const { handleFatalError } = require('../../../../Blood-Stream-db/utils/index')
const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')
const randomNumber = require('../../../utils/random')

module.exports = (injectedStore) => {
  const store = injectedStore

  const list = async (page) => {
    const page2 = randomNumber
    const pageSize = utils.totalPage()
    let array = []
    let value = null
    let arrayReview = []
    let gameArray = []

    const { Games, PlatformGames, Platform, LenguagesGames, GenresGames, Genres, Lenguages, GamesRating } = await store(config(false)).catch(utils.handleFatalError)
    const game = await Games.findAll(page2, pageSize).catch(utils.handleFatalError)
    for (const element in game) {
      const el = game[element]
      const genre = await GenresGames.findByGame(el.id).catch(utils.handleFatalError)
      const lenguage = await LenguagesGames.findByGame(el.id).catch(utils.handleFatalError)
      let platform = await PlatformGames.findByGame(el.id).catch(utils.handleFatalError)
      if (platform === null) {
        platform = await Platform.findById(1).catch(utils.handleFatalError)
        const checkPlatform = {
          id: 1,
          uuid: 'Temp',
          platformId: platform.id,
          gameId: el.id
        }
        platform = []
        platform = platform.concat(checkPlatform)
      } else {
        let tempArray = []
        tempArray = tempArray.concat(platform)
        platform = tempArray
        tempArray = []
      }
      const rating = await GamesRating.findByGame(el.id).catch(utils.handleFatalError)

      for (const i in rating) {
        const el = rating[i]
        value = await Games.findById(el.gameId).catch(handleFatalError)
        el.gameId = value
        delete el.id
        delete el.Rating
        delete el.userId
        delete el.createdAt
        delete el.updatedAt
        delete el.gameId
        arrayReview = arrayReview.concat(el)
      }

      for (const element in genre) {
        const el = genre[element]
        value = await Genres.findById(el.genreId).catch(utils.handleFatalError)
        value = {
          uuid: value.uuid,
          Genre: value.Genre
        }
        array = array.concat(value)
      }

      el.genre = array
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

      el.lenguages = array

      array = []
      for (const o in platform) {
        const el = platform[o]
        value = await Platform.findById(el.platformId).catch(utils.handleFatalError)
        value = {
          uuid: value.uuid,
          Platform: value.Platform
        }
        array = array.concat(value)
      }

      el.platform = array
      el.reviews = arrayReview
      gameArray = gameArray.concat(el)
    }
    return gameArray
  }

  const get = async (name) => {
    let array = []
    let value = null
    let arrayReview = []
    const { Games, PlatformGames, Platform, LenguagesGames, GenresGames, Genres, Lenguages, GamesRating } = await store(config(false)).catch(utils.handleFatalError)

    const game = await Games.findByName(name).catch(utils.handleFatalError)
    const genre = await GenresGames.findByGame(game.id).catch(utils.handleFatalError)
    const lenguage = await LenguagesGames.findByGame(game.id).catch(utils.handleFatalError)
    let platform = await PlatformGames.findByGame(game.id).catch(utils.handleFatalError)
    if (platform === null) {
      platform = await Platform.findById(1).catch(utils.handleFatalError)
      const checkPlatform = {
        id: 1,
        uuid: 'Temp',
        platformId: platform.id,
        gameId: game.id
      }
      platform = []
      platform = platform.concat(checkPlatform)
    }
    const rating = await GamesRating.findByGame(game.id).catch(utils.handleFatalError)
    for (const i in rating) {
      const el = rating[i]
      value = await Games.findById(el.gameId).catch(handleFatalError)
      el.gameId = value
      delete el.id
      delete el.Rating
      delete el.userId
      delete el.createdAt
      delete el.updatedAt
      delete el.gameId
      arrayReview = arrayReview.concat(el)
    }

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
    for (const o in platform) {
      const el = platform[o]
      console.log(el)
      value = await Platform.findById(el.platformId).catch(utils.handleFatalError)
      value = {
        uuid: value.uuid,
        Platform: value.Platform
      }
      array = array.concat(value)
    }

    game.platform = array
    game.reviews = arrayReview
    return game
  }

  const getByGroup = async (game, page) => {
    const pageSize = utils.totalPage()
    const { Games } = await store(config(false)).catch(utils.handleFatalError)
    let games = await Games.findByName(game).catch(utils.handleFatalError)
    games = await Games.findAllGroup(games.group, page, pageSize).catch(utils.handleFatalError)
    return games
  }

  const getByPopular = async (page) => {
    const page2 = randomNumber
    const pageSize = utils.totalPage()
    const { Games } = await store(config(false)).catch(utils.handleFatalError)
    const games = await Games.findAllPopular(page2, pageSize).catch(utils.handleFatalError)
    return games
  }
  // TO DO
  /* const upsert = async (body) => {

  }

  const deleteGame = async (game) => {
    console.log('Works')
  } */

  return {
    list,
    get,
    getByPopular,
    // upsert,
    // deleteGame,
    getByGroup
  }
}
