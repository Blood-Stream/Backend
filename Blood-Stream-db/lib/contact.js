'use strict'

module.exports = function setupContact (contactModel) {
  async function createOrUpdate (contact) {
    const cond = {
      where: {
        uuid: contact.uuid
      }
    }

    const existingcontact = await contactModel.findOne(cond)
    if (existingcontact) {
      const updated = await contactModel.update(contact, cond)
      return updated ? contactModel.findOne(cond) : existingcontact
    }
    const result = await contactModel.create(contact)
    return result.toJSON()
  }

  async function findById (id) {
    return await contactModel.findOne({
      where: {
        id
      }
    })
  }

  async function findByUuid (uuid) {
    return await contactModel.findOne({
      where: {
        uuid
      }
    })
  }

  async function findByEmail (email) {
    const userExist = await contactModel.findOne({
      where: {
        email
      }
    })

    if (userExist) {
      return true
    }
  }

  async function findAll () {
    return await contactModel.findAll()
  }

  async function deleteById (id) {
    return await contactModel.destroy({
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
    findByEmail
  }
}
