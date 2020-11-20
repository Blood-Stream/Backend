/**
 * Usar el siguiente codigo desde la terminal
 * situado en la carpeta principal
 * para crear juegos en la base de datos
 *
 * DEBUG=app:* node Blood-Stream-db/scripts/SeedGamesRating.js
 */

'use strict'

const utils = require('../utils/index')
const Controller = require('../../Blood-Stream-login/api/components/games-rating/index')
const gamesRating = require('./Mocks/gamesRating/gamesRating')

async function run () {
  console.log('Comienza gamesRating')
  for (const element in gamesRating) {
    const el = gamesRating[element]
    const gamesRatings = await Controller.upsert({
      Game: el.Game,
      Nickname: el.User,
      Review: el.Review,
      Like_Post: el.Like_Post,
      Rating: el.Rating
    }).catch(utils.handleFatalError)

    console.log(gamesRatings)
    console.log('-------------------------------------')
  }
}

run()
