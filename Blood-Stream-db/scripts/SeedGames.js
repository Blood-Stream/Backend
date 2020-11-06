/**
 * Usar el siguiente codigo desde la terminal
 * situado en la carpeta principal
 * para crear juegos en la base de datos
 *
 * DEBUG=app:* node Blood-Stream-db/scripts/SeedGames.js
 */

'use strict'

const db = require('../index')
const config = require('../../config/config')
const { nanoid } = require('nanoid')
const utils = require('../utils/index')
const book1 = require('./Mocks/Games/Book1')
const book2 = require('./Mocks/Games/Book2')
const book3 = require('./Mocks/Games/Book3')
const book4 = require('./Mocks/Games/Book4')
const book5 = require('./Mocks/Games/Book5')
const book6 = require('./Mocks/Games/Book6')
const book7 = require('./Mocks/Games/Book7')
const book8 = require('./Mocks/Games/Book8')
const book9 = require('./Mocks/Games/Book9')
const book10 = require('./Mocks/Games/Book10')
const book11 = require('./Mocks/Games/Book11')
const book12 = require('./Mocks/Games/Book12')
const book13 = require('./Mocks/Games/Book13')
const book14 = require('./Mocks/Games/Book14')
const book15 = require('./Mocks/Games/Book15')
const book16 = require('./Mocks/Games/Book16')
const book17 = require('./Mocks/Games/Book17')

async function run () {
  const {
    Games
  } = await db(config(false)).catch(utils.handleFatalError)

  let game
  let el
  console.log('Comienza book1')

  for (const element in book1) {
    el = book1[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza book2')

  for (const element in book2) {
    el = book2[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza book3')
  for (const element in book3) {
    el = book3[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }

  console.log('Comienza book4')

  for (const element in book4) {
    el = book4[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza book5')

  for (const element in book5) {
    el = book5[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza book6')

  for (const element in book6) {
    el = book6[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza book7')

  for (const element in book7) {
    el = book7[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza book8')

  for (const element in book8) {
    el = book8[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza book9')

  for (const element in book9) {
    el = book9[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza book10')

  for (const element in book10) {
    el = book10[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza book11')

  for (const element in book11) {
    el = book11[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza book12')

  for (const element in book12) {
    el = book12[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza book13')

  for (const element in book13) {
    el = book13[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza book14')

  for (const element in book14) {
    el = book14[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza book15')

  for (const element in book15) {
    el = book15[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }
  console.log('Comienza book16')
  for (const element in book16) {
    el = book16[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }

  console.log('Comienza book17')
  for (const element in book17) {
    el = book17[element]
    game = await Games.createOrUpdate({
      uuid: nanoid(),
      Url_Game: el.Url_Game,
      Name: el.Name,
      Subtitle: el.Subtitle,
      Icon_Url: el.Icon_Url,
      Description: el.Description,
      Developer: el.Developer,
      Age_Rating: el.Age_Rating,
      Size: el.Size,
      Original_Release_Date: el.Original_Release_Date,
      Current_Version_Release_Date: el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log('-------------------------------------')
  }

}

run()
