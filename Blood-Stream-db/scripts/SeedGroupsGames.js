/**
 * Usar el siguiente codigo desde la terminal
 * situado en la carpeta principal
 * para crear juegos en la base de datos
 *
 * DEBUG=app:* node Blood-Stream-db/scripts/SeedGroupGames.js
 */

'use strict'

const db = require('../index')
const config = require('../../config/config')
const utils = require('../utils/index')
const book1 = require('../../../Blood-Stream-App/bloodstream-recommendation.js')

async function run () {
  const {
    Games
  } = await db(config(false)).catch(utils.handleFatalError)

  let game
  let el
  let gamesF
  console.log('comienza')
  for (const element in book1) {
    el = book1[element]
    game = await Games.findById(el.ID).catch(utils.handleFatalError)
    game.group = el.group
    delete game.id
    delete game.createdAt
    delete game.updatedAt
    gamesF = await Games.createOrUpdate(game).catch(utils.handleFatalError)
    console.log(gamesF)
    console.log('-------------------------------------')
  }
}

run()
