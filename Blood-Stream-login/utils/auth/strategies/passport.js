const passport = require('passport')
google = require('./google')

User = require('../../../../Blood-Stream-db/models/users')

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })
  google
}
