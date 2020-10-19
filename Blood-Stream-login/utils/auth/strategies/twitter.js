'use strict'

const passport = require('passport')
const axios = require('axios')
const boom = require('@hapi/boom')

const { get } = require('lodash')
const { Strategy: TwitterStrategy } = require('passport-twitter')

const config = require('../../../../config/config')

passport.use(
  new TwitterStrategy({
    consumerKey: config(false).twitterConsumerKey,
    consumerSecret: config(false).twitterConsumerSecret,
    callbackURL: 'auth/twitter/callback',
    includeEmail: true
  },
  async (token, tokenSecret, profile, cb) => {
    const { data, status } = await axios({
      url: `${config(false).apiUrl}/api/auth/sing-provider`,
      method: 'post',
      data: {
        name: profile.displayName,
        email: get(profile, 'emails.0.value', `${profile.username}@twitter.com`),
        password: profile.id,
        apiKeyToken: config(false).apiKeyToken
      }
    })

    if (!data || status !== 200) return cb(boom.unauthorized(), false)

    return cb(null, data)
  }
  )
)