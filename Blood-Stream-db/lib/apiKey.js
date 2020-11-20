'use strict'

module.exports = function setupApiKey (apiKeyModel) {
  async function createOrUpdate (apiKey) {
    const cond = {
      where: {
        token: apiKey.token
      }
    }

    const existingApiKey = await apiKeyModel.findOne(cond)
    if (existingApiKey) {
      const updated = await apiKeyModel.update(apiKey, cond)
      return updated ? apiKeyModel.findOne(cond) : existingApiKey
    }

    const result = await apiKeyModel.create(apiKey)
    return result.toJSON()
  }

  async function findById (id) {
    return await apiKeyModel.findOne({
      where: {
        id
      }
    })
  }

  async function findByToken (token) {
    return await apiKeyModel.findOne({
      where: {
        token
      }
    })
  }
  async function findAll () {
    return await apiKeyModel.findAll()
  }

  async function deleteById (id) {
    return await apiKeyModel.destroy({
      where: {
        id
      }
    })
  }

  return {
    createOrUpdate,
    findById,
    findAll,
    deleteById,
    findByToken
  }
}
