'use strict'

module.exports = function setupGenres (genresModel) {
  async function createOrUpdate (genres) {
    const cond = {
      where: {
        uuid: genres.uuid
      }
    }

    const existinggenres = await genresModel.findOne(cond)
    if (existinggenres) {
      const updated = await genresModel.update(cond)
      return updated ? genresModel.findOne(cond) : existinggenres
    }
    const result = await genresModel.create(genres)
    return result.toJSON()
  }

  async function findById (id) {
    return await genresModel.findOne({
      where: {
        id
      }
    })
  }

  async function findByUuid (uuid) {
    return await genresModel.findOne({
      where: {
        uuid
      }
    })
  }

  async function findByGenre (Genre) {
    return await genresModel.findOne({
      where: {
        Genre
      }
    })
  }

  async function findAll () {
    return await genresModel.findAll()
  }

  async function deleteById (id) {
    return await genresModel.destroy({
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
    findByGenre
  }
}
