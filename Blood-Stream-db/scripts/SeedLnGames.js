/**
 * Usar el siguiente codigo desde la terminal
 * situado en la carpeta principal
 * para crear juegos en la base de datos
 *
 * DEBUG=app:* node Blood-Stream-db/scripts/SeedLnGames.js
 */

'use strict'

const utils = require('../utils/index')
const Controller = require('../../Blood-Stream-login/api/components/lenguages/index')
const lenguage = require('./Mocks/Languages-Games/LGames')

async function run () {

  console.log('Comienza lenguage')
  for (const element in lenguage) {
    const el = lenguage[element]
    const lenguages = await Controller.upsert({
      game: el.URL,
      lenguage: el.Languages
    }).catch(utils.handleFatalError)

    console.log(lenguages)
    console.log('-------------------------------------')
  }
}

run()
