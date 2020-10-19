'use strict'

const setupDatabase = require('./lib/db')

const setupMessageModel = require('./models/message')
const setupPasswordModel = require('./models/password')
const setupUsersModel = require('./models/users')
const setupGamesCollectionModel = require('./models/gamesCollection')
const setupContactModel = require('./models/contact')
const setupAccessRolModel = require('./models/accessRol')
const setupPlatformModel = require('./models/platform')
const setupPlatformGamesModel = require('./models/platformGames')
const setupLanguagesModel = require('./models/lenguages')
const setupLenguagesGamesModel = require('./models/lenguagesGames')
const setupGenresModel = require('./models/genres')
const setupGenresGamesModel = require('./models/genresGames')
const setupGamesModel = require('./models/games')
const setupGamesRatingModel = require('./models/gamesRating')

const defaults = require('defaults')

const setupMessage = require('./lib/message')
const setupPassword = require('./lib/password')
const setupUsers = require('./lib/users')
const setupGamesCollection = require('./lib/gamesCollection')
const setupContact = require('./lib/contact')
const setupAccessRol = require('./lib/accessRol')
const setupPlatform = require('./lib/platform')
const setupPlatformGames = require('./lib/platformGames')
const setupLenguages = require('./lib/lenguages')
const setupLenguagesGames = require('./lib/lenguagesGames')
const setupGenres = require('./lib/genres')
const setupGenresGames = require('./lib/genresGames')
const setupGames = require('./lib/games')
const setupGamesRating = require('./lib/gamesRating')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'postgres',
    pools: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)
  const MessagesModel = setupMessageModel(config)
  const PasswordModel = setupPasswordModel(config)
  const UsersModel = setupUsersModel(config)
  const ContactModel = setupContactModel(config)
  const AccessRolModel = setupAccessRolModel(config)
  const PlatformsModel = setupPlatformModel(config)
  const GamesModel = setupGamesModel(config)
  const LenguagesModel = setupLanguagesModel(config)
  const LenguagesGamesModel = setupLenguagesGamesModel(config)
  const PlatformGamesModel = setupPlatformGamesModel(config)
  const GenresGamesModel = setupGenresGamesModel(config)
  const GenresModel = setupGenresModel(config)
  const GamesCollectionModel = setupGamesCollectionModel(config)
  const GamesRatingModel = setupGamesRatingModel(config)

  UsersModel.hasMany(MessagesModel)
  UsersModel.belongsTo(PlatformsModel)
  UsersModel.belongsTo(ContactModel)
  UsersModel.belongsTo(AccessRolModel)
  UsersModel.belongsTo(PasswordModel)

  LenguagesGamesModel.belongsTo(LenguagesModel)
  LenguagesGamesModel.belongsTo(GamesModel)

  PlatformGamesModel.belongsTo(PlatformsModel)
  PlatformGamesModel.belongsTo(GamesModel)

  GenresGamesModel.belongsTo(GenresModel)
  GenresGamesModel.belongsTo(GamesModel)

  GamesCollectionModel.belongsTo(UsersModel)
  GamesCollectionModel.belongsTo(GamesModel)

  GamesRatingModel.belongsTo(GamesModel)
  GamesRatingModel.belongsTo(UsersModel)

  await sequelize.authenticate()

  await sequelize.sync()
  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Message = setupMessage(MessagesModel, UsersModel)
  const Password = setupPassword(PasswordModel)
  const Users = setupUsers(UsersModel, PlatformsModel, AccessRolModel, PasswordModel, ContactModel)
  const Contact = setupContact(ContactModel)
  const AccessRol = setupAccessRol(AccessRolModel)
  const Platform = setupPlatform(PlatformsModel)
  const Games = setupGames(GamesModel)
  const Lenguages = setupLenguages(LenguagesModel)
  const LenguagesGames = setupLenguagesGames(GamesModel, LenguagesModel, LenguagesGamesModel)
  const PlatformGames = setupPlatformGames(GamesModel, PlatformsModel, PlatformGamesModel)
  const GenresGames = setupGenresGames(GenresGamesModel, GenresModel, GamesModel)
  const Genres = setupGenres(GenresModel)
  const GamesCollection = setupGamesCollection(GamesCollectionModel, UsersModel, GamesModel)
  const GamesRating = setupGamesRating(GamesRatingModel, UsersModel, GamesModel)

  return {
    Message,
    Password,
    Users,
    GamesCollection,
    Contact,
    AccessRol,
    Platform,
    PlatformGames,
    Lenguages,
    LenguagesGames,
    Genres,
    GenresGames,
    Games,
    GamesRating,
  }
}
