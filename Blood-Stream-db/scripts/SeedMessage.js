/**
 * Usar el siguiente codigo desde la terminal
 * situado en la carpeta principal
 * para crear juegos en la base de datos
 *
 * DEBUG=app:* node Blood-Stream-db/scripts/SeedMessage.js
 */

'use strict'

const utils = require('../utils/index')
const Controller = require('../../Blood-Stream-login/api/components/messages')
const message = require('./Mocks/Message')

async function run () {

  console.log('Comienza Message')
  for (const element in message) {
    const el = message[element]
    const messagesUser = await Controller.upsert({
      nickname: el.nickname,
      message: el.message
    }).catch(utils.handleFatalError)

    console.log(messagesUser)
    console.log('-------------------------------------')
  }
}

run()
