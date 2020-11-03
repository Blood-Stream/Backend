'use strict'

module.exports = function setupGamesRating (gamesRatingModel, UsersModel, GamesModel) {
  async function createOrUpdate (gamesRating, uuidUser, uuidGames) {
    const cond = {
      where: {
        uuid: gamesRating.uuid
      }
    }

    if (uuidUser) {
      Object.assign(gamesRating, { userId: uuidUser })
    }

    if (uuidGames) {
      Object.assign(gamesRating, { gameId: uuidGames })
    }


    const existinggamesRating = await gamesRatingModel.findOne(cond)
    if (existinggamesRating) {
      const updated = await gamesRatingModel.update(gamesRating, cond)
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

  async function findByGame (gameId) {
    return await gamesRatingModel.findAll({
      where: {
        gameId: gameId
      }
    })
  }
  
  async function findByIdGame (gameId) {
    return await gamesRatingModel.findAll({
      where: {
        gameId: gameId
      }
    })
  }
  
  async function findByUsGm (userId, gameId) {
    return await gamesRatingModel.findOne({
      where: {
        userId: userId,
        gameId: gameId
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
    deleteById,
    findByGame,
    findByUsGm,
    findByIdGame
  }
}
