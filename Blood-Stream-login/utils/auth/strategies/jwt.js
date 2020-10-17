'use strict'

const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const store = require('../../../../Blood-Stream-db/index')

const boom = require('@hapi/boom')

const config = require('../../../../config/config')

passport.use(
  new Strategy({
    secretOrKey: config(false).authJwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  async (tokenPayload, cb) => {
    const { Users } = await store(config(false)).catch(utils.handleFatalError)
    try {
      const user = await Users.findByNickname(tokenPayload)
      if (!user) return cb(boom.unauthorized(), false)

      cb(null, { ...user })
    } catch (error) {
      return cb(error)
    }
  }
  )
)