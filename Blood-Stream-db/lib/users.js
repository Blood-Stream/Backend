'use strict'

const paginate = require('./pagination')

module.exports = function setupUsers (usersModel, platformModel, accessRolModel, passwordModel, contactModel) {
  async function createOrUpdate (users, uuidPlat, uuidAccRol, uuidCont, uuidPass) {
    const cond = {
      where: {
        uuid: users.uuid
      }
    }

    const platform = await platformModel.findOne({
      where: {
        uuid: uuidPlat
      }
    })
    const contact = await contactModel.findOne({
      where: {
        uuid: uuidCont
      }
    })
    const password = await passwordModel.findOne({
      where: {
        uuid: uuidPass
      }
    })
    const accessRol = await accessRolModel.findOne({
      where: {
        uuid: uuidAccRol
      }
    })

    if (platform) {
      Object.assign(users, { platformId: platform.id })
    }
    if (contact) {
      Object.assign(users, { contactId: contact.id })
    }
    if (accessRol) {
      Object.assign(users, { accessRolId: accessRol.id })
    }
    if (password) {
      Object.assign(users, { passwordId: password.id })
    }

    const existingusers = await usersModel.findOne(cond)
    if (existingusers) {
      const updated = await usersModel.update(users, cond)
      return updated ? usersModel.findOne(cond) : existingusers
    }

    const result = await usersModel.create(users)
    return result.toJSON()
  }

  async function findById (id) {
    return await usersModel.findOne({
      where: {
        id
      }
    })
  }

  async function findByNickname (Nickname) {
    return await usersModel.findOne({
      where: {
        Nickname
      }
    })
  }

  async function findByUuid (uuid) {
    return await usersModel.findOne({
      where: {
        uuid
      }
    })
  }
  
  async function findByContactId(id) {
    return await usersModel.findone({
      where: {
        contactId: id
      }
    })
  }

  async function findAll (page, pageSize) {
    return await usersModel.findAll(
      paginate(
        {
          where: {}
        },
        {page, pageSize}
      )
    )
  }
  
  
 
  async function deleteById (id) {
    return await usersModel.destroy({
      where: {
        id
      }
    })
  }

  async function userExists (users) {
    const userExist = await usersModel.findOne({
      where: {
        Nickname: users
      }
    })

    if (userExist) {
      return true
    }
  }

  return {
    createOrUpdate,
    findById,
    findByUuid,
    findByNickname,
    findAll,
    deleteById,
    userExists,
    findByContactId
  }
}
