/**
 * Usar el siguiente codigo desde la terminal
 * situado en la carpeta principal
 * para crear juegos en la base de datos
 *
 * DEBUG=app:* node Blood-Stream-db/scripts/SeedGenreGames.js
 */

'use strict'

const utils = require('../utils/index')
const Controller = require('../../Blood-Stream-login/api/components/genres-games/index')
const genreGame = require('./Mocks/Genre-Games/Games-Genre')

async function run () {
  console.log('Comienza genreGame')
  for (const element in genreGame) {
    const el = genreGame[element]
    const genreGames = await Controller.upsert({
      genre: el.Genres,
      game: el.URL
    }).catch(utils.handleFatalError)

    console.log(genreGames)
    console.log('-------------------------------------')
  }
}

run()
