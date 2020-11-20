const bcrypt = require('bcrypt')
const utils = require('../../../../Blood-Stream-db/utils')
const config = require('../../../../config/config')
const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
const store = require('../../../../Blood-Stream-db/index')

passport.use(new BasicStrategy(async (username, password, cb) => {
  const { Password, Users, Platform, Contact, AccessRol } = await store(config(false)).catch(utils.handleFatalError)
  let contactTemp = await Contact.findByEmail(username).catch(utils.handleFatalError)
  let users = await Users.findByNickname(username).catch(utils.handleFatalError)
  if (contactTemp) {
    contactTemp = await Contact.findByEmail2(username).catch(utils.handleFatalError)
    users = await Users.findByContactId(contactTemp.id).catch(utils.handleFatalError)
  }
  try {
    const platform = await Platform.findById(users.platformId)
    const contact = await Contact.findById(users.contactId)
    const accessRol = await AccessRol.findById(users.accessRolId)
    if (!users) {
      return cb(boom.unauthorized(), false)
    }
    const pass = await Password.findById(users.passwordId).catch(utils.handleFatalError)
    if (!await bcrypt.compare(password, pass.JWT_Password)) {
      return cb(boom.unauthorized(), false)
    }
    delete users.passwordId
    delete users.id
    delete users.updatedAt

    delete contact.id
    delete contact.createdAt
    delete contact.updatedAt

    delete platform.id
    delete platform.createdAt
    delete platform.updatedAt

    delete accessRol.id
    delete accessRol.createdAt
    delete accessRol.updatedAt

    users.contactId = contact
    users.platformId = platform
    users.accessRolId = accessRol
    return cb(null, users)
  } catch (err) {
    return cb(err)
  }
}))
