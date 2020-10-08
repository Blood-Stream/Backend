'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const routes = require('./routes/routes')
const app = express()

app.use(cors())
app.use(bodyParser.json())

// ROUTER

routes(app).userRoute()
routes(app).authRoute()
routes(app).messageRoute()
routes(app).swaggerRoute()
routes(app).genreGamesRoute()
routes(app).lengugeRoute()
routes(app).gamesRoute()
routes(app).platformRoute()

routes(app).errorsRoute()

app.listen(config.api.port, () => {
  console.log(`Api escuchando en el puerto ${config.api.port}`)
})
