'use strict'

const db = require('../index')
const config = require('../../config/config')
const utils = require('../utils/index')
const { nanoid } = require('nanoid')
const Controller = require('../../Blood-Stream-login/api/components/user/index')
const book1 = require('../../../CSVtoJSON/JS/Book1')
const book2 = require('../../../CSVtoJSON/JS/Book2')
const book3 = require('../../../CSVtoJSON/JS/Book3')
const book4 = require('../../../CSVtoJSON/JS/Book4')
const book5 = require('../../../CSVtoJSON/JS/Book5')
const book6 = require('../../../CSVtoJSON/JS/Book6')
const book7 = require('../../../CSVtoJSON/JS/Book7')
const book8 = require('../../../CSVtoJSON/JS/Book8')
const book9 = require('../../../CSVtoJSON/JS/Book9')
const book10 = require('../../../CSVtoJSON/JS/Book10')
const book11 = require('../../../CSVtoJSON/JS/Book11')
const book12 = require('../../../CSVtoJSON/JS/Book12')
const book13 = require('../../../CSVtoJSON/JS/Book13')
const book14 = require('../../../CSVtoJSON/JS/Book14')
const book15 = require('../../../CSVtoJSON/JS/Book15')
const book16 = require('../../../CSVtoJSON/JS/Book16')
const book17 = require('../../../CSVtoJSON/JS/Book17')
const user1 = require('../../../CSVtoJSON/JS-Users/MOCK_DATA')
const user2 = require('../../../CSVtoJSON/JS-Users/My Saved Schema')
const user3 = require('../../../CSVtoJSON/JS-Users/My Saved Schema (1)')
const user4 = require('../../../CSVtoJSON/JS-Users/My Saved Schema (2)')
const user5 = require('../../../CSVtoJSON/JS-Users/My Saved Schema (3)')
const user6 = require('../../../CSVtoJSON/JS-Users/My Saved Schema (4)')
const user7 = require('../../../CSVtoJSON/JS-Users/My Saved Schema (5)')

async function run () {
<<<<<<< HEAD
  const {
=======
  /* const {
>>>>>>> e8a2b168927729cc9a30117a7e508c123b9548a3
    // Message,
    // Password,
    Users,
    // GamesCollection,
    // Contact,
    // AccessRol,
    // Platform,
    // PlatformGames,
    // Lenguages,
    // LenguagesGames,
    // Genres,
    // GenresGames,
    Games,
    // UserRating,
    // GamesRating,
    // GameRating
  } = await db(config(false)).catch(utils.handleFatalError)

  let game
  let el
<<<<<<< HEAD
  /* console.log('Comienza book1')
=======
  console.log('Comienza book1')
>>>>>>> e8a2b168927729cc9a30117a7e508c123b9548a3
  
  for (const element in book1) {
    el = book1[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }
  console.log('Comienza book2')
  
  for (const element in book2) {
    el = book2[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }
  console.log('Comienza book3')
  for (const element in book3) {
    el = book3[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }
  
  console.log('Comienza book4')
 
  for (const element in book4) {
    el = book4[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }
  console.log('Comienza book5')
  
  for (const element in book5) {
    el = book5[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }
  console.log('Comienza book6')
  
  for (const element in book6) {
    el = book6[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }
  console.log('Comienza book7')
  
  for (const element in book7) {
    el = book7[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }
  console.log('Comienza book8')
  
  for (const element in book8) {
    el = book8[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }
  console.log('Comienza book9')
  
  for (const element in book9) {
    el = book9[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }
  console.log('Comienza book10')
  
  for (const element in book10) {
    el = book10[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }
  console.log('Comienza book11')
  
  for (const element in book11) {
    el = book11[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }
  console.log('Comienza book12')
  
  for (const element in book12) {
    el = book12[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }
  console.log('Comienza book13')
  
  for (const element in book13) {
    el = book13[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }
  console.log('Comienza book14')
  
  for (const element in book14) {
    el = book14[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }
  console.log('Comienza book15')
  
  for (const element in book15) {
    el = book15[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }
  console.log('Comienza book16')
  for (const element in book16) {
    el = book16[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  }

  console.log('Comienza book17')
  for (const element in book17) {
    el = book17[element]
    game = await Games.createOrUpdate({
      "uuid": nanoid(),
      "Url_Game":el.Url_Game,
      "Name":el.Name,
      "Subtitle":el.Subtitle,
      "Icon_Url": el.Icon_Url,
      "Description": el.Description,
      "Developer": el.Developer,
      "Age_Rating": el.Age_Rating,
      "Size": el.Size,
      "Original_Release_Date": el.Original_Release_Date,
      "Current_Version_Release_Date": el.Current_Version_Release_Date,
    })
    console.log(game)
    console.log("-------------------------------------")
  } */

  console.log('Comienza User1')
  for (const element in user1) {
    el = user1[element]
    game = await Controller.upsert({
      "nickname": el.nickname,
      "country": el.country,
      "postal_Code": el.postal_Code,
      "birthday": el.birthday,
      "status": el.status,
      "platform": el.platform,
      "email": el.email,
      "phone": el.phone,
      "rol": el.rol,
      "level": el.level,
      "password": el.password,
    }).catch(utils.handleFatalError)
    console.log(game)
    console.log("-------------------------------------")
  } 
  console.log('Comienza User2')
  for (const element in user2) {
    el = user2[element]
    game = await Controller.upsert({
      "nickname": el.nickname,
      "country": el.country,
      "postal_Code": el.postal_Code,
      "birthday": el.birthday,
      "status": el.status,
      "platform": el.platform,
      "email": el.email,
      "phone": el.phone,
      "rol": el.rol,
      "level": el.level,
      "password": el.password,
    }).catch(utils.handleFatalError)
    console.log(game)
    console.log("-------------------------------------")
  } 
  console.log('Comienza User3')
  for (const element in user3) {
    el = user3[element]
    game = await Controller.upsert({
      "nickname": el.nickname,
      "country": el.country,
      "postal_Code": el.postal_Code,
      "birthday": el.birthday,
      "status": el.status,
      "platform": el.platform,
      "email": el.email,
      "phone": el.phone,
      "rol": el.rol,
      "level": el.level,
      "password": el.password,
    }).catch(utils.handleFatalError)
    console.log(game)
    console.log("-------------------------------------")
  } 
  console.log('Comienza User4')
  for (const element in user4) {
    el = user4[element]
    game = await Controller.upsert({
      "nickname": el.nickname,
      "country": el.country,
      "postal_Code": el.postal_Code,
      "birthday": el.birthday,
      "status": el.status,
      "platform": el.platform,
      "email": el.email,
      "phone": el.phone,
      "rol": el.rol,
      "level": el.level,
      "password": el.password,
    }).catch(utils.handleFatalError)
    console.log(game)
    console.log("-------------------------------------")
  } 
  console.log('Comienza User5')
  for (const element in user5) {
    el = user5[element]
    game = await Controller.upsert({
      "nickname": el.nickname,
      "country": el.country,
      "postal_Code": el.postal_Code,
      "birthday": el.birthday,
      "status": el.status,
      "platform": el.platform,
      "email": el.email,
      "phone": el.phone,
      "rol": el.rol,
      "level": el.level,
      "password": el.password,
    }).catch(utils.handleFatalError)
    console.log(game)
    console.log("-------------------------------------")
  } 
  console.log('Comienza User6')
  for (const element in user6) {
    el = user6[element]
    game = await Controller.upsert({
      "nickname": el.nickname,
      "country": el.country,
      "postal_Code": el.postal_Code,
      "birthday": el.birthday,
      "status": el.status,
      "platform": el.platform,
      "email": el.email,
      "phone": el.phone,
      "rol": el.rol,
      "level": el.level,
      "password": el.password,
    }).catch(utils.handleFatalError)
    console.log(game)
    console.log("-------------------------------------")
  } 
  console.log('Comienza User7')
  for (const element in user7) {
    el = user7[element]
    game = await Controller.upsert({
      "nickname": el.nickname,
      "country": el.country,
      "postal_Code": el.postal_Code,
      "birthday": el.birthday,
      "status": el.status,
      "platform": el.platform,
      "email": el.email,
      "phone": el.phone,
      "rol": el.rol,
      "level": el.level,
      "password": el.password,
    }).catch(utils.handleFatalError)
    console.log(game)
    console.log("-------------------------------------")
  } 
  
  

}

run()
