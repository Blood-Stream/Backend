'use strict'

const { nanoid } = require('nanoid')
const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')

module.exports = (injectedStore) => {
  const store = injectedStore

  const list = async () => {
    const { GamesRating } = await store(config(false)).catch(utils.handleFatalError)
    const gamesRating = await GamesRating.findAll().catch(utils.handleFatalError)

    return gamesRating
  }

  const get = async (page) => {
    const pagination = utils.totalPage()
    const { Games } = await store(config(false)).catch(utils.handleFatalError)
    
    let game = await Games.findAllRating(page, pagination).catch(utils.handleFatalError)
    return game 

  }

  const upsert = async (body) => {
    /**
     * Game
     * Nickname
     * Review
     * Like_Post
     * Review
     */

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
      usGm.uuid = userGame.uuid
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
    usGm = await GamesRating.createOrUpdate(usGm, user.id, games.id)

    usGm.userId = user
    usGm.gameId = games

    return usGm
  }

  const deleteGamesRating = async (game, user) => {
    const { GamesRating, Users, Games } = await store(config(false)).catch(utils.handleFatalError)
    const games = await Games.findByName(game).catch(utils.handleFatalError)
    const users = await Users.findByNickname(user).catch(utils.handleFatalError)
    let gameRate = await GamesRating.findByUsGm(users.id, games.id).catch(utils.handleFatalError)
    try {
      gameRate = await GamesRating.deleteById(gameRate.id).catch(utils.handleFatalError)
      return 'Erased'
    } catch(err) {
      return 'Not found'
    }
  }

  return {
    list,
    get,
    upsert,
    deleteGamesRating
  }
}
