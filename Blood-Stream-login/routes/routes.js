'use strict'

const swaggerUi = require('swagger-ui-express')
const message = require('../api/components/messages/network')
const user = require('../api/components/user/network')
const auth = require('../api/components/auth/network')
const swaggerDoc = require('../api/swagger.json')
const errors = require('../network/errors')
const genreGame = require('../api/components/genres-games/network')
const lenguage = require('../api/components/lenguages/network')
const games = require('../api/components/games/network')
const platform = require('../api/components/platform-games/network')

const routes = (app) => {
  const messageRoute = () => app.use('/message', message)
  const userRoute = () => app.use('/user', user)
  const authRoute = () => app.use('/user', auth)
  const swaggerRoute = () => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
  const errorsRoute = () => app.use(errors)
  const genreGamesRoute = () => app.use('/genre-games', genreGame)
  const lengugeRoute = () => app.use('/lenguage', lenguage)
  const gamesRoute = () => app.use('/game', games)
  const platformRoute = () => app.use('/platform', platform)

  return {
    messageRoute,
    userRoute,
    authRoute,
    swaggerRoute,
    errorsRoute,
    genreGamesRoute,
    lengugeRoute,
    gamesRoute,
    platformRoute
  }
}

module.exports = routes
