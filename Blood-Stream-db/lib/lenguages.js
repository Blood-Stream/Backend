'use strict'

'use strict'

module.exports = function setupLenguages (lenguagesModel) {
  async function createOrUpdate (lenguages) {
    const cond = {
      where: {
        uuid: lenguages.uuid
      }
    }

    const existinglenguages = await lenguagesModel.findOne(cond)
    if (existinglenguages) {
      const updated = await lenguagesModel.update(cond)
      return updated ? lenguagesModel.findOne(cond) : existinglenguages
    }
    const result = await lenguagesModel.create(lenguages)
    return result.toJSON()
  }

  function findById (id) {
    return lenguagesModel.findOne({
      where: {
        id
      }
    })
  }

  function findByUuid (uuid) {
    return lenguagesModel.findOne({
      where: {
        uuid
      }
    })
  }

  function findByLenguage (Lenguage) {
    return lenguagesModel.findOne({
      where: {
        Lenguages: Lenguage
      }
    })
  }

  function findAll () {
    return lenguagesModel.findAll()
  }

  async function deleteById (id) {
    return await lenguagesModel.destroy({
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
    findByLenguage
  }
}
