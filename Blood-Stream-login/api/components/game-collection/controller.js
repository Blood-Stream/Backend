'use strict'

const { nanoid } = require('nanoid')
const { use } = require('passport')
const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')
const controller = require('../auth/index')

module.exports = (injectedStore) => {
  const store = injectedStore

  const list = async () => {
    const { GamesCollection } = await store(config(false)).catch(utils.handleFatalError)
    const gameCollection = await GamesCollection.findAll().catch(utils.handleFatalError)

    return gameCollection
  }

  const get = async () => {

  }

  const upsert = async (body) => {
    /**
     * Game
     * Nickname
     * Text
     */

    console.log(body)
    const { GamesCollection, Users, Games } = await store(config(false)).catch(utils.handleFatalError)
    let user = await Users.findByNickname(body.Nickname).catch(utils.handleFatalError)
    let games = await Games.findByName(body.Game).catch(utils.handleFatalError)
    if (!user || !games) return 'Not exist'
    let userGame = await GamesCollection.findByUsGm(user.id, games.id)
    let usGm = {
      uuid: null,
      Notes: body.Text
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

    usGm = await GamesCollection.createOrUpdate(games.uuid, user.uuid, usGm)

    usGm.userId = user
    usGm.gameId = games

    return usGm
  }

  const deleteGameCollection = async (nickname) => {

  }

  return {
    list,
    get,
    upsert,
    deleteGameCollection
  }
}
