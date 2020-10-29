/**
 * Usar el siguiente codigo desde la terminal
 * situado en la carpeta principal
 * para crear juegos en la base de datos
 *
 * DEBUG=app:* node Blood-Stream-db/scripts/SeedLanguages.js
 */

'use strict'

const db = require('../index')
const config = require('../../config/config')
const { nanoid } = require('nanoid')
const utils = require('../utils/index')
const language = require('./Mocks/lenguages/languajes')

const run = async () => {
  const {
    Lenguages
  } = await db(config(false)).catch(utils.handleFatalError)

  console.log('Comienza languages')

  for (const element in language) {
    const el = language[element]
    const ln = await Lenguages.createOrUpdate({
      uuid: nanoid(),
      Lenguages: el.Languages,
      Icon: "http://dummyimage.com/165x183.png/cc0000/ffffff"
    }).catch(utils.handleFatalError)
    console.log(ln)
    console.log('-------------------------------------')
  }
}

run()
