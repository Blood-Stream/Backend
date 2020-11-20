/**
 * Usar el siguiente codigo desde la terminal
 * situado en la carpeta principal
 * para crear juegos en la base de datos
 *
 * DEBUG=app:* node Blood-Stream-db/scripts/SeedGameCollections.js
 */

'use strict'

const utils = require('../utils/index')
const Controller = require('../../Blood-Stream-login/api/components/game-collection/index')
const gameCollection = require('./Mocks/gamesCollection/gamesCollection')

async function run () {
  console.log('Comienza gameCollection')
  for (const element in gameCollection) {
    const el = gameCollection[element]
    const gameCollections = await Controller.upsert({
      Game: el.Game,
      Nickname: el.Nickname,
      Text: el.Text
    }).catch(utils.handleFatalError)

    console.log(gameCollections)
    console.log('-------------------------------------')
  }
}

run()
