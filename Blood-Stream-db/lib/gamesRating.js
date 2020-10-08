'use strict'

module.exports = function setupGamesRating (gamesRatingModel, UsersModel, GamesModel) {
  async function createOrUpdate (gamesRating, uuidUser, uuidGames) {
    const cond = {
      where: {
        uuid: gamesRating.uuid
      }
    }

    const games = await gamesModel.findOne({
      where: {
        uuid: uuidGames
      }
    })

    const user = await UsersModel.findOne({
      where: {
        uuid: uuidUser
      }
    })

    if (games) {
      Object.assign(lenguagesGames, { gameId: games.id })
    }

    if (user) {
      Object.assign(lenguagesGames, { userId: games.id })
    }

    const existinggamesRating = await gamesRatingModel.findOne(cond)
    if (existinggamesRating) {
      const updated = await gamesRatingModel.update(cond)
      return updated ? gamesRatingModel.findOne(cond) : existinggamesRating
    }
    const result = await gamesRatingModel.create(gamesRating)
    return result.toJSON()
  }

  async function findById (id) {
    return await gamesRatingModel.findOne({
      where: {
        id
      }
    })
  }

  async function findByUuid (uuid) {
    return await gamesRatingModel.findOne({
      where: {
        uuid
      }
    })
  }

  async function findAll () {
    return await gamesRatingModel.findAll()
  }

  async function deleteById (id) {
    return await gamesRatingModel.destroy({
      where: {
        id
      }
    })
  }

  return {
    createOrUpdate,
    findById,
    findByUuid,
    findAll,
    deleteById
  }
}
