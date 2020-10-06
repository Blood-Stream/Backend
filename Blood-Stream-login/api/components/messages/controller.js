'use strict'

const { nanoid } = require('nanoid')
const { use } = require('passport')
const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')
const controller = require('../auth/index')
let users

module.exports = function (injectedStore) {
  const store = injectedStore

  async function list () {
    const { Message } = await store(config(false)).catch(utils.handleFatalError)
    return Message.findAll().catch(utils.handleFatalError)
  }

  async function get (nickname) {

  }

  async function upsert (body) {
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

    return result
  }

  async function deleteMessage (nickname) {

  }

  return {
    list,
    get,
    upsert,
    deleteMessage
  }
}
