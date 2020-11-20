'use strict'

const { nanoid } = require('nanoid')
const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')
const randomNumber = require('../../../utils/random')

module.exports = (injectedStore) => {
  const store = injectedStore

  const list = async (page) => {
    const page2 = randomNumber
    const pageSize = utils.totalPage()
    const { Message } = await store(config(false)).catch(utils.handleFatalError)
    return Message.findAll(page2, pageSize).catch(utils.handleFatalError)
  }

  // TO DO
  // const get = async (nickname) => {

  // }

  const upsert = async (body) => {
    const { Message, Users } = await store(config(false)).catch(utils.handleFatalError)
    let message
    if (body.uuid) {
      message = {
        uuid: body.uuid
      }
    } else {
      message = {
        uuid: nanoid()
      }
    }
    const userUuid = await Users.findByNickname(body.nickname)

    Object.assign(message, {
      Message: body.message,
      Post_Like: false
    })

    const result = await Message.createOrUpdate(message, userUuid.id)

    result.userId = {
      id: userUuid.id,
      uuid: userUuid.uuid,
      Nickname: userUuid.Nickname
    }

    return result
  }
  // TO DO
  // const deleteMessage = async (nickname) => {

  // }
  return {
    list,
    upsert
    // deleteMessage
  }
}
