
'use strict'
const paginate = require('./pagination')

module.exports = function setupGenresGames (genreGamesModel, genreModel, gamesModel) {
  async function createOrUpdate (uuidGames, uuidGenres, genreGames) {
    const cond = {
      where: {
        uuid: genreGames.uuid
      }
    }
    const game = await gamesModel.findOne({
      where: {
        uuid: uuidGames
      }
    })
    const genre = await genreModel.findOne({
      where: {
        uuid: uuidGenres
      }
    })

    Object.assign(genreGames, { genreId: genre.id })
    Object.assign(genreGames, { gameId: game.id })

    const existingusers = await genreGamesModel.findOne(cond)
    if (existingusers) {
      const updated = await genreGamesModel.update(genreGames, cond)
      return updated ? genreGamesModel.findOne(cond) : existingusers
    }
    console.log(genreGames)
    const result = await genreGamesModel.create(genreGames)
    return result.toJSON()
  }

  async function findById (id) {
    return await genreGamesModel.findOne({
      where: {
        id
      }
    })
  }

  async function findByUuid (uuid) {
    return await genreGamesModel.findOne({
      where: {
        uuid
      }
    })
  }

  async function findByGame (gameId) {
    return await genreGamesModel.findAll({
      where: {
        gameId: gameId
      }
    })
  }

  async function findByGnGm (genresGameId, gameId) {
    return await genreGamesModel.findOne({
      where: {
        genreId: genresGameId,
        gameId: gameId
      }
    })
  }

  async function findAll (page, pageSize) {
    return await genreGamesModel.findAll(
      paginate(
        {
          where: {}
        },
        { page, pageSize }
      )
    )
  }

  async function deleteById (id) {
    return await genreGamesModel.destroy({
      where: {
        id
      }
    })
  }

  async function findByGameAll (platformId, page, pageSize) {
    return await genreGamesModel.findAll(
      paginate(
        {
          where: {
            genreId: platformId
          }
        },
        { page, pageSize }
      )
    )
  }

  return {
    createOrUpdate,
    findById,
    findByUuid,
    findAll,
    deleteById,
    findByGnGm,
    findByGame,
    findByGameAll
  }
}
