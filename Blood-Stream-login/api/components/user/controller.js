'use strict'

const { nanoid } = require('nanoid')
const auth = require('../auth')
const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')
const TABLA = 'users'
const ID = 'UserId'
let users

module.exports = function (injectedStore) {
  const store = injectedStore
  
  async function list () {
    let { Users } = await store(config(false)).catch(utils.handleFatalError)
    console.log('listing users')
    users = await Users.findAll().catch(utils.handleFatalError)
    return users
  }
  
  async function get (id) {
    let { Users } = await store(config(false)).catch(utils.handleFatalError)
    return Users.findById(id)
  }

  async function upsert (body) {
    const user = {
      name: body.name,
      username: body.username
    }

    if (body.id) {
      user.id = body.id
    } else {
      user.id = nanoid()
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password
      })
    }

    return store.upsert(TABLA, user)
  }
  async function deleteTable (id) {

  }

  return {
    list,
    get,
    upsert,
    deleteTable
  }
}
