'use strict'

const db = require('./index')
const chalk = require('chalk')
const inquirer = require('inquirer')
const config = require('../config/config')
const utils = require('./utils/index')

async function setup () {
  await db(config(false)).catch(utils.handleFatalError)

  console.log(`${chalk.bgGreen.black('[Connected]:')} Success!`)
}

setup()
