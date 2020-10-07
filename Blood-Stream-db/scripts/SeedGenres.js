/**
 * Usar el siguiente codigo desde la terminal
 * situado en la carpeta principal
 * para crear juegos en la base de datos
 *
 * DEBUG=app:* node Blood-Stream-db/scripts/SeedGenres.js
 */

'use strict'

const db = require('../index')
const config = require('../../config/config')
const { nanoid } = require('nanoid')
const utils = require('../utils/index')
const genres = require('./Mocks/genres')

const run = async () => {
  const {
    Genres
  } = await db(config(false)).catch(utils.handleFatalError)

  console.log('Comienza genres')

  for (const element in genres) {
    const el = genres[element]
    const genre = await Genres.createOrUpdate({
      uuid: nanoid(),
      Genre: el.Genre,
    })
    console.log(genre)
    console.log('-------------------------------------')
  }
}
run()
