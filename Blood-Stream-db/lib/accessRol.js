'use strict'

module.exports = function setupAccessRol (AccessRolModel) {
  async function createOrUpdate (accessRol) {
    const cond = {
      where: {
        uuid: accessRol.uuid
      }
    }

    const existingAccessRol = await AccessRolModel.findOne(cond)
    if (existingAccessRol) {
      const updated = await AccessRolModel.update(accessRol, cond)
      return updated ? AccessRolModel.findOne(cond) : existingAccessRol
    }

    const result = await AccessRolModel.create(accessRol)
    return result.toJSON()
  }

  async function findById (id) {
    return await AccessRolModel.findOne({
      where: {
        id
      }
    })
  }

  async function findByUuid (uuid) {
    return await AccessRolModel.findOne({
      where: {
        uuid
      }
    })
  }

  async function findByRol (Rol) {
    return await AccessRolModel.findOne({
      where: {
        Rol
      }
    })
  }

  async function findAll () {
    return await AccessRolModel.findAll()
  }

  async function deleteById (id) {
    return await AccessRolModel.destroy({
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
    findByRol
  }
}
