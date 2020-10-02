'use strict'

const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')
const controller = require('../auth/index')
const auth = require('../../../auth')
let users

module.exports = function (injectedStore) {
  const store = injectedStore

  async function list () {
    console.log('------STORE-------')
    console.log(store)
    console.log('------Config-------')
    console.log(config(false))
    console.log('-------------------')
    const { Users } = await store(config(false)).catch(utils.handleFatalError)
    users = await Users.findAll().catch(utils.handleFatalError)
    return users
  }

  async function get (nickname) {
    const { Users } = await store(config(false)).catch(utils.handleFatalError)
    return Users.findByNickname(nickname).catch(utils.handleFatalError)
  }

  async function upsert (body) {
    const { Users, Contact, AccessRol, Platform } = await store(config(false)).catch(utils.handleFatalError)

    const userExist = await Users.userExists(body.nickname).catch(utils.handleFatalError)
    const contactExist = await Contact.findByEmail(body.email).catch(utils.handleFatalError)
    if (userExist || contactExist) {
      return 'User or Email Exist'
    }

    const uuidPlatform = nanoid()
    const uuidContact = nanoid()
    const uuidUser = nanoid()
    const uuidRol = nanoid()
    const uuidPassword = nanoid()
    const user = {
      Nickname: body.nickname,
      Country: body.country,
      Postal_Code: body.postal_Code,
      Birthday: body.birthday,
      Status: body.status
    }
    if (body.uuid) {
      user.uuid = body.uuid
    } else {
      user.uuid = uuidUser
    }
    const platform = {
      uuid: uuidPlatform,
      Platform: body.platform
    }

    await Platform.createOrUpdate(platform).catch(utils.handleFatalError)

    const contacts = {
      uuid: uuidContact,
      email: body.email,
      phone: body.phone
    }

    await Contact.createOrUpdate(contacts).catch(utils.handleFatalError)

    const accessRols = {
      uuid: uuidRol,
      Rol: body.rol,
      Level: body.level
    }
    await AccessRol.createOrUpdate(accessRols).catch(utils.handleFatalError)
    const pass = {
      uuid: uuidPassword,
      JWT_Password: body.password
    }

    const authData = {
      uuid: uuidPassword,
      password: body.password
    }
    await controller.upsert(authData)

    const result = await Users.createOrUpdate(user, uuidPlatform, uuidRol, uuidContact, uuidPassword)

    return result
  }

  async function deleteTable (nickname) {
    const { Users, Contact, AccessRol, Platform, Password } = await store(config(false)).catch(utils.handleFatalError)
    const user = await Users.findByNickname(nickname).catch(utils.handleFatalError)
    if (user) {
      if (user.contactId) {
        await Contact.deleteById(user.contactId).catch(utils.handleFatalError)
      }
      if (user.accessRolId) {
        await AccessRol.deleteById(user.accessRolId).catch(utils.handleFatalError)
      }
      if (user.platformId) {
        await Platform.deleteById(user.platformId).catch(utils.handleFatalError)
      }

      if (user.passwordId) {
        await Password.deleteById(user.passwordId).catch(utils.handleFatalError)
      }
      if (user.id) {
        await Users.deleteById(user.id).catch(utils.handleFatalError)
      }
      return `The user ${nickname} was erased`
    }
    return `The user ${nickname} was not found`
  }

  return {
    list,
    get,
    upsert,
    deleteTable
  }
}
