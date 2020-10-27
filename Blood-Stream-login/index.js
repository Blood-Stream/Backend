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
/* const redis = require('redis')
const sessionExpress = require('express-session')
const redisStore = require('connect-redis')(sessionExpress)
const client = redis.createClient()
const redisServer = require('redis-server') */

/* const server = new redisServer({
  port: 6379,
  bin: '/opt/local/bin/redis-server'
})

server.open().then(() => {
  // You may now connect a client to the Redis server bound to `server.port`.
  app.use(session({
    secret: configuration(false).secret,
    // Creating new redis store
    store: new redisStore({ client: client, ttl: 260 }),
    saveUninitialized: false,
    resave: false,
    cookie: { secure: true }
  }))
  
  client.on('error', function(err) {
    console.log(`Redis error: ${err}`);
  })
  
  client.on('ready',function () {
    console.log('Redis is ready');
  })
}) */

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
