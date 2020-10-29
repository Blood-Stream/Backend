'use strict'

module.exports = function setupPlatform (platformModel) {
  async function createOrUpdate (platform) {
    const cond = {
      where: {
        uuid: platform.uuid
      }
    }

    const existingplatform = await platformModel.findOne(cond)
    if (existingplatform) {
      const updated = await platformModel.update(platform, cond)
      return updated ? platformModel.findOne(cond) : existingplatform
    }
    const result = await platformModel.create(platform)
    return result.toJSON()
  }

  function findById (id) {
    return platformModel.findOne({
      where: {
        id
      }
    })
  }

  function findByUuid (uuid) {
    return platformModel.findOne({
      where: {
        uuid
      }
    })
  }

  function findByPlatform (Platform) {
    return platformModel.findOne({
      where: {
        Platform
      }
    })
  }

  function findAll () {
    return platformModel.findAll()
  }

  async function deleteById (id) {
    return await platformModel.destroy({
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
    findByPlatform
  }
}
