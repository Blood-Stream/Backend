'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const routes = require('./routes/routes')
const app = express()
const cdd = require('../config/config')
app.use(cors())
app.use(bodyParser.json())

// ROUTER
routes(app).userRoute()
routes(app).authRoute()
routes(app).messageRoute()
routes(app).swaggerRoute()
routes(app).genreGamesRoute()

routes(app).errorsRoute()

app.listen(config.api.port, () => {
  console.log(cdd(false))
  console.log(`Api escuchando en el puerto ${config.api.port}`)
})
