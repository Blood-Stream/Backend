'use strict'

const bcrypt = require('bcrypt')
const utils = require('../../../../Blood-Stream-db/utils')
const config = require('../../../../config/config')

module.exports = function (injectedStore) {
  return {
    upsert: async (data) => {
      const authData = {
        uuid: data.uuid
      }

      if (data.password) {
        authData.JWT_Password = await bcrypt.hash(data.password, 5)
      }
      const { Password } = await injectedStore(config(false)).catch(utils.handleFatalError)

      await Password.createOrUpdate(authData)
    }
  }
}
