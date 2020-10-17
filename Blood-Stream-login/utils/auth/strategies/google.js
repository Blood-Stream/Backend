'use strict'

const passport = require('passport')
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth')
const axios = require('axios')
const boom = require('@hapi/boom')
const config = require('../../../../config/config')
const { method } = require('lodash')

passport.use(
  new GoogleStrategy({
    clientID: config(false).googleClientId,
    clientSecret: config(false).googleClientSecret,
    callbackURL: 'auth/google/callback'
  },
  async (accessToken, refreshToken, profile, cb) => {
    const { data, status } = await axios({
      url: `${config(false).apiUrl}/api/auth/sign-provider`,
      method: 'post',
      data: {
        name: profile.name,
        email: profile.email,
        password: profile.id,
        apiKeyToken: config(false).apiKeyToken
      }
    })

    if (!data || status !== 200) return cb(boom.unauthorized(), false)

    return cb(null, data)
  }
  )
)