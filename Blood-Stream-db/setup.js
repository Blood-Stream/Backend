'use strict'

const db = require('./index')
const chalk = require('chalk')
const config = require('../config/config')
const utils = require('./utils/index')
const prompt = inquirer.createPromptModule()

async function setup () {
  let answer = false
  process.argv.forEach((val) => {
    if (val === '--yes' || val === '-y') {
      answer = true
    }
  })

  if (!answer) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your database, are you sure?'
      }
    ])
    if (!answer.setup) {
      return console.log(chalk.green('Nothing happened :)'))
    }
  }
  await db(config(true)).catch(utils.handleFatalError)
  console.log(`${chalk.bgGreen.black('[Connected]:')} Success!`)
  process.exit(0)
}

setup()
