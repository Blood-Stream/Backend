'use strict'

const { nanoid } = require('nanoid')
const { use } = require('passport')
const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')
const controller = require('../auth/index')

module.exports = (injectedStore) => {
  const store = injectedStore

  const list = async () => {
    const { GenresGames } = await store(config(false)).catch(utils.handleFatalError)
    const gnGames = await GenresGames.findAll().catch(utils.handleFatalError)

    return gnGames
  }

  const upsert = async (body) => {
    const { GenresGames, Genres, Games } = await store(config(false)).catch(utils.handleFatalError)
    const genre = await Genres.findByGenre(body.genre).catch(utils.handleFatalError)
    let games = await Games.findByUrl(body.game).catch(utils.handleFatalError)
    if (!genre || !games) return 'Not exist'
    let genGame = await GenresGames.findByGnGm(genre.id, games.id)
    let gnGm = {
      uuid: null
    }

    if (genGame === null) {
      gnGm.uuid = nanoid()
    } else {
      gnGm.uuid = genGame.uuid
    }

    games = {
      id: games.id,
      uuid: games.uuid,
      Url_game: games.Url_Game,
      Name: games.Name,
      Developer: games.Developer
    }

    gnGm = await GenresGames.createOrUpdate(games.uuid, genre.uuid, gnGm)

    gnGm.genreId = genre
    gnGm.gameId = games

    return gnGm
  }

  const deleteMessage = async (nickname) => {

  }

  return {
    list,
    upsert,
    deleteMessage
  }
}
