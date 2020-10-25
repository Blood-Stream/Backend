# DataBase

## Usage

``` js
const setupDataBase = require('Blood-Stream-db')

setupDataBase(config).then(db => {
  const {
    Message,
    Password,
    Users,
    GamesCollection,
    Contact,
    AccessRol,
    Platform,
    PlatformGames,
    Lenguages,
    LenguagesGames,
    Genres,
    GenresGames,
    Games,
    UserRating,
    GamesRating,
    GameRating
  } = db
}).catch(err => console.error(err))

```