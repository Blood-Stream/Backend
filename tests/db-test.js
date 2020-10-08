'use strict'

const test = require('ava')

let db = null
const config = {
  loggin: function () {}
}

test.beforeEach(async () => {
  const setupDatabase = require('../Blood-Stream-db/index')
  db = await setupDatabase(config)
})

test('Message', t => {
  t.truthy(db.Message, 'Message table should exist')
})

test('Password', t => {
  t.truthy(db.Password, 'Password table should exist')
})
test('Users', t => {
  t.truthy(db.Users, 'Users table should exist')
})
test('GamesCollection', t => {
  t.truthy(db.GamesCollection, 'GamesCollection table should exist')
})
test('Contact', t => {
  t.truthy(db.Contact, 'Contact table should exist')
})
test('AccessRol', t => {
  t.truthy(db.AccessRol, 'AccessRol table should exist')
})
test('Platform', t => {
  t.truthy(db.Platform, 'Platform table should exist')
})
test('PlatformGames', t => {
  t.truthy(db.PlatformGames, 'PlatformGames table should exist')
})
test('Lenguages', t => {
  t.truthy(db.Lenguages, 'Lenguages table should exist')
})
test('LenguagesGames', t => {
  t.truthy(db.LenguagesGames, 'LenguagesGames table should exist')
})
test('Genres', t => {
  t.truthy(db.Genres, 'Genres table should exist')
})
test('GenresGames', t => {
  t.truthy(db.GenresGames, 'GenresGames table should exist')
})
test('Games', t => {
  t.truthy(db.Games, 'Games table should exist')
})
test('GamesRating', t => {
  t.truthy(db.GamesRating, 'GamesRating table should exist')
})
