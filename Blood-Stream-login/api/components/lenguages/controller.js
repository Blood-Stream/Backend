'use strict'

const { nanoid } = require('nanoid')
const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')
const randomNumber = require('../../../utils/random')

module.exports = (injectedStore) => {
  const store = injectedStore

  const list = async (page) => {
    const page2 = randomNumber
    const pageSize = utils.totalPage()
    const { LenguagesGames } = await store(config(false)).catch(utils.handleFatalError)
    const lenguages = await LenguagesGames.findAll(page2, pageSize).catch(utils.handleFatalError)
    return lenguages
  }

  const upsert = async (body) => {
    console.log(body)
    const { LenguagesGames, Games, Lenguages } = await store(config(false)).catch(utils.handleFatalError)
    const lenguage = await Lenguages.findByLenguage(body.lenguage).catch(utils.handleFatalError)
    let games = await Games.findByUrl(body.game).catch(utils.handleFatalError)
    if (!lenguage || !games) return 'Not exist'

    const lenGame = await LenguagesGames.findByLnGm(lenguage.id, games.id).catch(utils.handleFatalError)
    let lnGm = {
      uuid: null
    }

    if (lenGame === null) {
      lnGm.uuid = nanoid()
    } else {
      lnGm.uuid = lenGame.uuid
    }

    games = {
      id: games.id,
      uuid: games.uuid,
      Url_game: games.Url_Game,
      Name: games.Name,
      Developer: games.Developer
    }

    lnGm = await LenguagesGames.createOrUpdate(games.uuid, lenguage.uuid, lnGm)

    lnGm.lenguageId = lenguage
    lnGm.gameId = games

    return lnGm
  }
  const lnList = async (ln, page) => {
    const page2 = randomNumber
    const pageSize = utils.totalPage()
    const { Games, LenguagesGames, Lenguages } = await store(config(false)).catch(utils.handleFatalError)
    let platforms = await Lenguages.findByLenguage(ln).catch(utils.handleFatalError)
    platforms = await LenguagesGames.findByGameAll(platforms.id, page2, pageSize).catch(utils.handleFatalError)
    let collection = []
    let games
    for (const element in platforms) {
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
  // TO DO
  // const deleteLenguage = async (nickname) => {

  // }

  return {
    list,
    upsert,
    lnList
    // deleteLenguage
  }
}
