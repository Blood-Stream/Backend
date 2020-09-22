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
const setupLanguagesGamesModel = require('./models/lenguagesGames')
const setupGenresModel = require('./models/genres')
const setupGenresGamesModel = require('./models/genresGames')
const setupGamesModel = require('./models/games')
const setupUserRatingModel = require('./models/userRating')
const setupGamesRatingModel = require('./models/gamesRating')
const setupGameRatingModel = require('./models/gameRating')

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
const setupUserRating = require('./lib/userRating')
const setupGamesRating = require('./lib/gamesRating')
const setupGameRating = require('./lib/gameRating')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
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
  const GamesCollectionModel = setupGamesCollectionModel(config)
  const ContactModel = setupContactModel(config)
  const AccessRolModel = setupAccessRolModel(config)
  const PlatformsModel = setupPlatformModel(config)
  const PlatformGamesModel = setupPlatformGamesModel(config)
  const LenguagesModel = setupLanguagesModel(config)
  const LanguagesGamesModel = setupLanguagesGamesModel(config)
  const GenresModel = setupGenresModel(config)
  const GenresGamesModel = setupGenresGamesModel(config)
  const GamesModel = setupGamesModel(config)
  const UserRatingModel = setupUserRatingModel(config)
  const GamesRatingModel = setupGamesRatingModel(config)
  const GameRatingModel = setupGameRatingModel(config)

  // UsersModel.hasMany(MessagesModel)
  // UsersModel.hasMany(GamesCollectionModel)
  // UsersModel.hasMany(ContactModel)
  // UsersModel.hasMany(PlatformsModel)

  // UsersModel.hasOne(PasswordModel)
  // UsersModel.hasOne(UserRatingModel)
  // UsersModel.hasOne(AccessRolModel)

  UsersModel.belongsTo(PlatformsModel)
  UsersModel.belongsTo(ContactModel)
  UsersModel.belongsTo(AccessRolModel)
  UsersModel.belongsTo(PasswordModel)
  // GamesCollectionModel.belongsTo(UsersModel)
  // GamesCollectionModel.belongsTo(GamesModel)
  // AccessRolModel.belongsTo(UsersModel)
  // PasswordModel.belongsTo(UsersModel)
  // MessagesModel.belongsTo(UsersModel)
  // UserRatingModel.belongsTo(UsersModel)
  // UserRatingModel.belongsTo(GamesRatingModel)

  // GamesModel.hasMany(GamesCollectionModel)

  // LanguagesGamesModel.belongsTo(GamesModel)
  // LanguagesGamesModel.belongsTo(LenguagesModel)

  // GenresGamesModel.belongsTo(GamesModel)
  // GenresGamesModel.belongsTo(GenresModel)

  // PlatformGamesModel.belongsTo(GamesModel)
  // PlatformGamesModel.belongsTo(PlatformsModel)

  // GameRatingModel.belongsTo(GamesModel)
  // GameRatingModel.belongsTo(GamesRatingModel)

  await sequelize.authenticate()

  sequelize.sync()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Message = setupMessage(MessagesModel)
  const Password = setupPassword(PasswordModel)
  const Users = setupUsers(UsersModel, PlatformsModel, AccessRolModel, PasswordModel, ContactModel)
  const GamesCollection = setupGamesCollection(GamesCollectionModel)
  const Contact = setupContact(ContactModel)
  const AccessRol = setupAccessRol(AccessRolModel)
  const Platform = setupPlatform(PlatformsModel)
  const PlatformGames = setupPlatformGames()
  const Lenguages = setupLenguages(LenguagesModel)
  const LenguagesGames = setupLenguagesGames(GamesModel, PlatformsModel, PlatformGamesModel)
  const Genres = setupGenres(GenresModel)
  const GenresGames = setupGenresGames(GenresGamesModel, GenresGamesModel, GamesModel)
  const Games = setupGames(GamesModel)
  const UserRating = setupUserRating(UserRatingModel, GamesRatingModel, UsersModel)
  const GamesRating = setupGamesRating(GamesRatingModel)
  const GameRating = setupGameRating(GameRatingModel, GamesRatingModel, GamesModel)

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
    UserRating,
    GamesRating,
    GameRating
  }
}
