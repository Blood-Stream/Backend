'use strict'

module.exports = function setupMessages (messagesModel, usersModel) {
  async function createOrUpdate (messages, uuid) {
    const cond = {
      where: {
        uuid: messages.uuid
      }
    }
    
    const existingusers = await usersModel.findOne({
      where: {
        uuid
      }
    })

    const existingmessages = await messagesModel.findOne(cond)
    if (existingmessages) {
      const updated = await messagesModel.update(messages, cond)
      return updated ? messagesModel.findOne(cond) : existingmessages
    }

    Object.assign(messages, { userId: existingusers.id })
    const result = await messagesModel.create(messages)
    return result.toJSON()
  }

  function findById (id) {
    return messagesModel.findOne({
      where: {
        id
      }
    })
  }

  function findByUuid (uuid) {
    return messagesModel.findOne({
      where: {
        uuid
      }
    })
  }

  function findAll () {
    return messagesModel.findAll()
  }

  async function deleteById (id) {
    return await messagesModel.destroy({
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
