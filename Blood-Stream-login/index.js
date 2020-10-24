'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const config = require('./config')
const routes = require('./routes/routes')
const session = require('express-session')
//const passport = require('passport')
const app = express()
const con = require('../config/config')
const helmet = require('helmet')
const passport = require('./utils/auth/strategies/passport')
app.use(cors())
app.use(bodyParser.json())

// app.use(express.cookieParser(con(false).sessionSecret))
// app.use(session(con(false).sessionSecret))
app.use(helmet())
passport(app)
// ROUTER
routes(app).userRoute()
routes(app).authRoute()
routes(app).messageRoute()
routes(app).swaggerRoute()
routes(app).genreGamesRoute()
routes(app).lenguageRoute()
routes(app).gamesRoute()
routes(app).platformRoute()
routes(app).gameCollectionRoute()
routes(app).gamesRatingRoute()

routes(app).errorsRoute()

app.listen(config.api.port, () => {
  console.log(`Api escuchando en el puerto ${config.api.port}`)
})
