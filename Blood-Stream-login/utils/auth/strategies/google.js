'use strict'

const passport = require('passport')
// const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth')
const { OAuth2Strategy } = require('passport-oauth')
const axios = require('axios')
const boom = require('@hapi/boom')
const config = require('../../../../config/config')
const { method } = require('lodash')

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';
const GOOGLE_URSERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

const oAuth2Strategy = new OAuth2Strategy(
  {
    authorizationURL: GOOGLE_AUTHORIZATION_URL,
    tokenURL: GOOGLE_TOKEN_URL,
    clientID: config(false).googleClientId,
    clientSecret: config(false).googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    const { data, status  } = await axios({
      url: `${config.apiUrl}/user/login`,
      method: 'post',
      data: {
        name: profile.name,
        email: profile.email,
        password: profile.id,
        apiKeyToken: config.apiKeyToken
      }
    });
    if (!data || status !== 200) return cb(boom.unauthorized(), false)
    return cb(null, data)
  }
)
//console.log(oAuth2Strategy)
oAuth2Strategy.userProfile = (accessToken, done) => {
  this._oauth2.get(GOOGLE_USERINFO_URL, accessToken, (err, body) => {
    console.log(body)
    if (err) return done(err)
    try {
      const { sub, name, email  } = JSON.parse(body);
      const profile = {
        id: sub,
        name,
        email
      }
      done(null, profile)
    } catch (parseError) {
        return done(parseError)
    }
  })
}

passport.use("google-oauth", oAuth2Strategy)
