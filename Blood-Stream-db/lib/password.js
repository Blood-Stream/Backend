'use strict'

module.exports = function setupPassword (passwordModel) {
  async function createOrUpdate (password) {
    const cond = {
      where: {
        uuid: password.uuid
      }
    }

    const existingpassword = await passwordModel.findOne(cond)
    if (existingpassword) {
      const updated = await passwordModel.update(password, cond)
      return updated ? passwordModel.findOne(cond) : existingpassword
    }
    const result = await passwordModel.create(password)
    return result.toJSON()
  }

  function findById (id) {
    return passwordModel.findOne({
      where: {
        id
      }
    })
  }

  function findByJwt (jwtPassword) {
    return passwordModel.findOne({
      where: {
        JWT_Password: jwtPassword
      }
    })
  }

  function findByUuid (uuid) {
    return passwordModel.findOne({
      where: {
        uuid
      }
    })
  }

  function findAll () {
    return passwordModel.findAll()
  }

  async function deleteById (id) {
    return await passwordModel.destroy({
      where: {
        id
      }
    })
  }

  return {
    createOrUpdate,
    findById,
    findByUuid,
    findByJwt,
    findAll,
    deleteById
  }
}
