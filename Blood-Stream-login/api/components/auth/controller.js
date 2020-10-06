'use strict'

const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const utils = require('../../../../Blood-Stream-db/utils')
const auth = require('../../../auth/index')
const config = require('../../../../config/config')

module.exports = function (injectedStore) {
  const store = injectedStore

  async function login (username, password) {
    const { Password, Users } = await store(config(false)).catch(utils.handleFatalError)
    const users = await Users.findByNickname(username).catch(utils.handleFatalError)
    if (users) {
      console.log(users.passwordId)
      const pass = await Password.findById(users.passwordId).catch(utils.handleFatalError)
      return bcrypt.compare(password, pass.JWT_Password)
        .then(areEquals => {
          if (areEquals === true) {
            // token
            return auth.sign(JSON.parse(JSON.stringify(pass)))
          } else {
            throw new Error('Invalid information')
          }
        })
    }
    return 'The user does not exits'
  }

  async function retrievePass (username, password) {
    const { Password, Users } = await store(config(false)).catch(utils.handleFatalError)
    const users = await Users.findByNickname(username).catch(utils.handleFatalError)

    if (!users) {
      return `The user ${username} does not exits`
    }
    if (users.passwordId) {
      await Password.deleteById(users.passwordId).catch(utils.handleFatalError)
    }
    const uuidPassword = nanoid()

    const authData = {
      uuid: uuidPassword,
      password: password
    }
    await upsert(authData)
    await Users.createOrUpdate(users, null, null, null, uuidPassword)

    return `The password for the user ${username} was changed successfull`
  }

  async function upsert (data) {
    let authData = {
      uuid: data.uuid
    }

    if (data.password) {
      authData.JWT_Password = await bcrypt.hash(data.password, 5)
    }
    const { Password } = await store(config(false)).catch(utils.handleFatalError)

    authData = await Password.createOrUpdate(authData)
    return authData

  }

  return {
    upsert,
    login,
    retrievePass
  }
}
