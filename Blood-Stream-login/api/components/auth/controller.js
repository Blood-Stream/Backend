'use strict'

const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const utils = require('../../../../Blood-Stream-db/utils')
const auth = require('../../../auth/index')
const config = require('../../../../config/config')
const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const jwt = require('jsonwebtoken')
const boom = require('@hapi/boom')

require('../../../utils/auth/strategies/basic')

module.exports = (injectedStore) => {
  const store = injectedStore

  const login = async (req, res, next) => {
      }

  const retrievePass = async (username, password) => {
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

  const upsert = async (data) => {
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
