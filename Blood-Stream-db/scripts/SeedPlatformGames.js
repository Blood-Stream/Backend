/**
 * Usar el siguiente codigo desde la terminal
 * situado en la carpeta principal
 * para crear juegos en la base de datos
 *
 * DEBUG=app:* node Blood-Stream-db/scripts/SeedPlatformGames.js
 */

'use strict'

const utils = require('../utils/index')
const Controller = require('../../Blood-Stream-login/api/components/platform-games/index')
const platform = require('./Mocks/Platform-games/platformGames')

async function run () {

  console.log('Comienza platform')
  for (const element in platform) {
    const el = platform[element]
    const platforms = await Controller.upsert({
      platform: el.Platform,
      game: el.Game
    }).catch(utils.handleFatalError)

    console.log(platforms)
    console.log('-------------------------------------')
  }
}

run()
