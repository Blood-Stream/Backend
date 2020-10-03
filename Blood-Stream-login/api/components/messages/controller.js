'use strict'

const { nanoid } = require('nanoid')
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
