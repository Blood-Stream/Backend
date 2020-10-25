'use strict'

const { nanoid } = require('nanoid')
const utils = require('../../../../Blood-Stream-db/utils/index')
const config = require('../../../../config/config')
const auth = require('../auth')

module.exports = function (injectedStore) {
  return {
    upsert: async (body) => {
      const { Users, Contact, AccessRol, Platform } = await injectedStore(config(false)).catch(utils.handleFatalError)

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

      const authData = {
        uuid: uuidPassword,
        password: body.password
      }
      await auth.upsert(authData)

      const result = await Users.createOrUpdate(user, uuidPlatform, uuidRol, uuidContact, uuidPassword)

      return result
    }
  }
}
