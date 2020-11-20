/**
 * Usar el siguiente codigo desde la terminal
 * situado en la carpeta principal
 * para crear juegos en la base de datos
 *
 * DEBUG=app:* node Blood-Stream-db/scripts/SeedUsers.js
 */

'use strict'

const utils = require('../utils/index')
const Controller = require('../../Blood-Stream-login/api/components/user/index')
const user1 = require('./Mocks/Users/Users (1)')
const user2 = require('./Mocks/Users/Users (2)')
const user3 = require('./Mocks/Users/Users (3)')
const user4 = require('./Mocks/Users/Users (4)')
const user5 = require('./Mocks/Users/Users (5)')
const user6 = require('./Mocks/Users/Users (6)')
const user7 = require('./Mocks/Users/Users (7)')

async function run () {
  let game
  let el

  console.log('Comienza User1')
  for (const element in user1) {
    el = user1[element]
    game = await Controller.upsert({
      nickname: el.nickname,
      country: el.country,
      postal_Code: el.postal_Code,
      birthday: el.birthday,
      status: el.status,
      avatar: el.avatar,
      platform: el.platform,
      email: el.email,
      phone: el.phone,
      rol: el.rol,
      level: el.level,
      password: el.password
    }).catch(utils.handleFatalError)
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza User2')
  for (const element in user2) {
    el = user2[element]
    game = await Controller.upsert({
      nickname: el.nickname,
      country: el.country,
      postal_Code: el.postal_Code,
      birthday: el.birthday,
      status: el.status,
      avatar: el.avatar,
      platform: el.platform,
      email: el.email,
      phone: el.phone,
      rol: el.rol,
      level: el.level,
      password: el.password
    }).catch(utils.handleFatalError)
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza User3')
  for (const element in user3) {
    el = user3[element]
    game = await Controller.upsert({
      nickname: el.nickname,
      country: el.country,
      postal_Code: el.postal_Code,
      birthday: el.birthday,
      status: el.status,
      avatar: el.avatar,
      platform: el.platform,
      email: el.email,
      phone: el.phone,
      rol: el.rol,
      level: el.level,
      password: el.password
    }).catch(utils.handleFatalError)
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza User4')
  for (const element in user4) {
    el = user4[element]
    game = await Controller.upsert({
      nickname: el.nickname,
      country: el.country,
      postal_Code: el.postal_Code,
      birthday: el.birthday,
      status: el.status,
      avatar: el.avatar,
      platform: el.platform,
      email: el.email,
      phone: el.phone,
      rol: el.rol,
      level: el.level,
      password: el.password
    }).catch(utils.handleFatalError)
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza User5')
  for (const element in user5) {
    el = user5[element]
    game = await Controller.upsert({
      nickname: el.nickname,
      country: el.country,
      postal_Code: el.postal_Code,
      birthday: el.birthday,
      status: el.status,
      avatar: el.avatar,
      platform: el.platform,
      email: el.email,
      phone: el.phone,
      rol: el.rol,
      level: el.level,
      password: el.password
    }).catch(utils.handleFatalError)
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza User6')
  for (const element in user6) {
    el = user6[element]
    game = await Controller.upsert({
      nickname: el.nickname,
      country: el.country,
      postal_Code: el.postal_Code,
      birthday: el.birthday,
      status: el.status,
      avatar: el.avatar,
      platform: el.platform,
      email: el.email,
      phone: el.phone,
      rol: el.rol,
      level: el.level,
      password: el.password
    }).catch(utils.handleFatalError)
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza User7')
  for (const element in user7) {
    el = user7[element]
    game = await Controller.upsert({
      nickname: el.nickname,
      country: el.country,
      postal_Code: el.postal_Code,
      birthday: el.birthday,
      status: el.status,
      avatar: el.avatar,
      platform: el.platform,
      email: el.email,
      phone: el.phone,
      rol: el.rol,
      level: el.level,
      password: el.password
    }).catch(utils.handleFatalError)
    console.log(game)
    console.log('-------------------------------------')
  }
}

run()
