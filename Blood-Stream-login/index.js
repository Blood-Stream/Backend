'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const routes = require('./routes/routes')
const app = express()
const helmet = require('helmet')
const configuration = require('../config/config')
const session = require('express-session')
const cookieParser = require('cookie-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
app.use(cookieParser())
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: configuration(false).secret 
  })
)

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
