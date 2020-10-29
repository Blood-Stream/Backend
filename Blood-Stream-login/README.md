# Backend

This is the backend configuration for the project BloodStream

contributors for backend:

* Carlos Gutierrez <ingecarlos.gutierrez@gmail.com>
* Stiven Mosquera <moquera012@gmail.com>

license used: 
* MIT


---
## Configuration

### Usage

``` js
module.exports = function config (configExtra) {
  const config = {
    database: process.env.DB_NAME || 'bloodstreamdb',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'password',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    loggin: s => debug(s)
  }
  
  if (configExtra) {
    Object.assign(config, {
      setup: true
    })
  }
  
  if (process.env.NODE_ENV === 'production') {
    Object.assign(config, {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  }

  return config
}
```
---
## DataBase

### Usage

``` js
const setupDataBase = require('Blood-Stream-db')

setupDataBase(config).then(db => {
  const {
    message,
    password,
    users,
    gamesCollection,
    contact,
    accessRol,
    platform,
    platformGames,
    lenguages,
    lenguagesGames,
    genres,
    genresGames,
    games,
    userRating,
    gamesRating,
    gameRating
  } = db
}).catch(err => console.error(err))

```

---
