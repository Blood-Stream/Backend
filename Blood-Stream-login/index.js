'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const config = require('./config')
const user = require('./api/components/user/network')
const errors = require('./network/errors')
const app = express()

app.use(cors())
app.use(bodyParser.json())

const swaggerDoc = require('./api/swagger.json')
const auth = require('./api/components/auth/network')

// ROUTER
app.use('/user', user)
app.use('/user', auth)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use(errors)

app.listen(config.api.port, () => {
  console.log(`Api escuchando en el puerto ${config.api.port}`)
})
