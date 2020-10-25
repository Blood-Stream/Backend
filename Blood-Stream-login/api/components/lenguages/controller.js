'use strict'

const { nanoid } = require('nanoid')
const { use } = require('passport')
const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')

module.exports = (injectedStore) => {
  const store = injectedStore

  const list = async () => {
    const { LenguagesGames } = await store(config(false)).catch(utils.handleFatalError)
    const lenguages = await LenguagesGames.findAll().catch(utils.handleFatalError)
    return lenguages
  }

  const upsert = async (body) => {
    console.log(body)
    const { LenguagesGames, Games, Lenguages } = await store(config(false)).catch(utils.handleFatalError)
    const lenguage = await Lenguages.findByLenguage(body.lenguage).catch(utils.handleFatalError)
    let games = await Games.findByUrl(body.game).catch(utils.handleFatalError)
    if (!lenguage || !games) return 'Not exist'

    let lenGame = await LenguagesGames.findByLnGm(lenguage.id, games.id).catch(utils.handleFatalError)
    let lnGm = {
      uuid: null
    }

    if (lenGame === null) {
      lnGm.uuid = nanoid()
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

    lnGm = await LenguagesGames.createOrUpdate(games.uuid, lenguage.uuid, lnGm)

    lnGm.lenguageId = lenguage
    lnGm.gameId = games

    return lnGm
  }

  const deleteLenguage = async (nickname) => {

  }

  return {
    list,
    upsert,
    deleteLenguage
  }
}
