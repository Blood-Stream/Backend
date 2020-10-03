'use strict'

const { nanoid } = require('nanoid')
const auth = require('../auth')
// const utils = require('../../../../Blood-Stream-db/utils/index')
// const config = require('../../../../config/config')


const TABLE = 'user'

module.exports = function (injectedStore) {
  return {
    upsert: async (body) => {
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
      return injectedStore.get(TABLE, body)
    }
  }
}
