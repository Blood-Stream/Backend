'use strict'

const { nanoid } = require('nanoid')
const { use } = require('passport')
const contact = require('../../../../Blood-Stream-db/models/contact')
const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')
const auth = require('../../../auth')
const controller = require('../auth/index')
let users

module.exports = (injectedStore) => {
  const store = injectedStore

  const list = async (page, pageSize) => {
    const { Users } = await store(config(false)).catch(utils.handleFatalError)
    users = await Users.findAll(page, pageSize).catch(utils.handleFatalError)
    return users
  }

  const get = async (nickname) => {
    const { Users, Contact, AccessRol, Platform, Password } = await store(config(false)).catch(utils.handleFatalError)
    let users = await Users.findByNickname(nickname).catch(utils.handleFatalError)
    const contacts = await Contact.findById(users.contactId).catch(utils.handleFatalError)
    const platform = await Platform.findById(users.platformId).catch(utils.handleFatalError)
    const accessRols = await AccessRol.findById(users.accessRolId).catch(utils.handleFatalError)
    let authData = await Password.findById(users.passwordId).catch(utils.handleFatalError)

    authData = {
      id: authData.id,
      uuid: authData.uuid
    }

    users.platformId = platform
    users.contactId = contacts
    users.accessRolId = accessRols
    users.passwordId = authData

    return users
  }

  const upsert = async (body) => {
    const { Users, Contact, AccessRol, Platform, Password } = await store(config(false)).catch(utils.handleFatalError)

    let uuidPlatform = null
    let uuidContact = null
    let uuidUser = null
    let uuidRol = null
    let uuidPassword = null

    let user = {
      Nickname: body.nickname,
      Country: body.country,
      Postal_Code: body.postal_Code,
      Birthday: body.birthday,
      Status: body.status,
      Avatar: body.avatar,
      Level: body.level
    }

    let platform = null
    let contacts = null
    let accessRols = null
    let authData = null
    let usersCheck = {
      passwordId: null
    }

    if (!body.uuid) {
      const userExist = await Users.userExists(body.nickname).catch(utils.handleFatalError)
      const contactExist = await Contact.findByEmail(body.email).catch(utils.handleFatalError)
      if (userExist || contactExist) {
        return 'User or Email Exist'
      }

      uuidContact = nanoid()
      uuidUser = nanoid()
      uuidPassword = nanoid()

      user.uuid = uuidUser

      contacts = { uuid: uuidContact, email: body.email, phone: body.phone }
      accessRols = { uuid: uuidRol, Rol: body.rol }
    } else {
      user.uuid = body.uuid
      const users = await Users.findByUuid(user.uuid).catch(utils.handleFatalError)
      contacts = await Contact.findById(users.contactId).catch(utils.handleFatalError)
      if (contacts.email !== body.email) contacts.email = body.email
      if (contacts.phone !== body.phone) contacts.phone = body.phone
      uuidContact = contacts.uuid
      usersCheck = users
    }

    platform = await Platform.findByPlatform(body.platform)
    if (!platform) {
      uuidPlatform = nanoid()
      platform = { uuid: uuidPlatform, Platform: body.platform }
      platform = await Platform.createOrUpdate(platform).catch(utils.handleFatalError)
    } else {
      uuidPlatform = platform.uuid
    }

    accessRols = await AccessRol.findByRol(body.rol)
    if (!accessRols) {
      uuidRol = nanoid()
      accessRols = { uuid: uuidRol, Rol: body.rol }
      accessRols = await AccessRol.createOrUpdate(accessRols).catch(utils.handleFatalError)
    } else {
      uuidRol = accessRols.uuid
    }

    if (usersCheck.passwordId !== null) {
      authData = await Password.findById(usersCheck.passwordId).catch(utils.handleFatalError)
    } else {
      if (!body.password) return 'Need password to create a user'
      authData = { uuid: uuidPassword, password: body.password }
      authData = await controller.upsert(authData).catch(utils.handleFatalError)
    }

    authData = {
      id: authData.id,
      uuid: authData.uuid
    }

    contacts = await Contact.createOrUpdate(contacts).catch(utils.handleFatalError)

    user = await Users.createOrUpdate(user, uuidPlatform, uuidRol, uuidContact, uuidPassword)

    delete user.passwordId
    delete user.id
    delete user.updatedAt

    delete contacts.id
    delete contacts.createdAt
    delete contacts.updatedAt

    delete platform.id
    delete platform.createdAt
    delete platform.updatedAt

    delete accessRols.id
    delete accessRols.createdAt
    delete accessRols.updatedAt
    
    user.platformId = platform
    user.contactId = contacts
    user.accessRolId = accessRols
    user.passwordId = authData
    delete user.passwordId
    return user
  }

  const createOrUpdateUser = async ({ user }) => {
    console.log(user)
    const { Users, Contact } = await store(config(false)).catch(utils.handleFatalError)

    const queriedUser = await Contact.findByEmail({ email: user.email }).catch(utils.handleFatalError)
    
    if(queriedUser) return await Users.findByContactId(queriedUser.id).catch(utils.handleFatalError)

    return await upsert({ user }).catch(utils.handleFatalError)

  }

  const deleteTable = async (nickname) => {
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
