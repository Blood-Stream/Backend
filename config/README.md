# Configuration

## Usage

``` js
module.exports = function config (configExtra) {
  let config = null

  if (configExtra) {
    config = {
      database: process.env.DB_NAME || 'bloodstreamdb',
      username: process.env.DB_USER || 'bloodstream',
      password: process.env.DB_PASS || 'password',
      hostname: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      loggin: s => debug(s),
      setup: true
    }
  } else {
    config = {
      database: process.env.DB_NAME || 'bloodstreamdb',
      username: process.env.DB_USER || 'bloodstream',
      password: process.env.DB_PASS || 'password',
      hostname: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      loggin: s => debug(s)
    }
  }

  return config
}
```

```