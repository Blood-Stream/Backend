const bcrypt = require('bcrypt')
const utils = require('../../../../Blood-Stream-db/utils')
const config = require('../../../../config/config')
const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')

passport.use(new BasicStrategy(async (user, password, cb) => {
  const { Password, Users } = await store(config(false)).catch(utils.handleFatalError)
  const users = await Users.findByNickname(username).catch(utils.handleFatalError)
    
  try {
    if (!users) {
      return cb(boom.unauthorized(), false) 
    }
    const pass = await Password.findById(users.passwordId).catch(utils.handleFatalError)
    if (!bcrypt.compare(password, pass.JWT_Password)) {
      return cb(boom.unauthorized(), false)
    }
    delete user.passwordId
    return cb(null, user)
  } catch (err) {
    return cb(err)
  }
}))

