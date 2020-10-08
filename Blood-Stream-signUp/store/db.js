'use strict'

const utils = require('../../Blood-Stream-db/utils/index')
const config = require('../../config/config')
const db = require('../../Blood-Stream-db/setup')

module.exports = async function () {
  const {
    Message,
    Password,
    Users,
    GamesCollection,
    Contact,
    AccessRol,
    Platform,
    PlatformGames,
    Lenguages,
    LenguagesGames,
    Genres,
    GenresGames,
    Games,
    UserRating,
    GamesRating,
    GameRating
  } = await db(config(false)).catch(utils.handleFatalError)

  return {
    Message,
    Password,
    Users,
    GamesCollection,
    Contact,
    AccessRol,
    Platform,
    PlatformGames,
    Lenguages,
    LenguagesGames,
    Genres,
    GenresGames,
    Games,
    UserRating,
    GamesRating,
    GameRating
  }
}
