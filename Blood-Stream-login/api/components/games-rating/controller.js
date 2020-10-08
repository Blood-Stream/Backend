'use strict'

const { nanoid } = require('nanoid')
const { use } = require('passport')
const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')
const controller = require('../auth/index')

module.exports = (injectedStore) => {
  const store = injectedStore

  const list = async () => {
    const { GamesRating } = await store(config(false)).catch(utils.handleFatalError)
    const gamesRating = await GamesRating.findAll().catch(utils.handleFatalError)

    return gamesRating
  }

  const get = async () => {

  }

  const upsert = async (body) => {
    /**
     * Game
     * Nickname
     * Review
     * Like_Post
     * Review
     */

    console.log(body)
    const { GamesRating, Users, Games } = await store(config(false)).catch(utils.handleFatalError)
    let user = await Users.findByNickname(body.Nickname).catch(utils.handleFatalError)
    let games = await Games.findByName(body.Game).catch(utils.handleFatalError)
    if (!user || !games) return 'Not exist'
    let userGame = await GamesRating.findByUsGm(user.id, games.id)
    let usGm = {
      uuid: null,
      Review: body.Review,
      Like_Post: body.Like_Post,
      Rating: body.Rating
    }
    if (userGame === null) {
      usGm.uuid = nanoid()
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

    user = {
      id: user.id,
      uuid: user.uuid,
      Nickname: user.Nickname,
      Avatar: user.Avatar,
    }
    console.log(usGm)
    usGm = await GamesRating.createOrUpdate(usGm, user.id, games.id)

    usGm.userId = user
    usGm.gameId = games

    return usGm
  }

  const deleteGamesRating = async (nickname) => {

  }

  return {
    list,
    get,
    upsert,
    deleteGamesRating
  }
}
