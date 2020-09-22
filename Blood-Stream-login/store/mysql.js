'use strict'

const mysql = require('mysql')

// const config = require('../config')
const config = require('dbConfig')

const dbconf = {
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
}

let connection

function handleCon () {
  connection = mysql.createConnection(dbconf)

  connection.connect((err) => {
    if (err) {
      console.error('[db error]', err)
      setTimeout(handleCon, 2000)
    } else {
      console.log('DB connected')
    }
  })
  connection.on('error', err => {
    console.error('[db error]', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon()
    } else {
      throw err
    }
  })
}

handleCon()

function list (table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => { // WHERE id = '${id}'
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function get (table, id, idName) {
  return new Promise((resolve, reject) => {
    console.log(`SELECT * FROM ${table} WHERE ${idName} = '${id}'`)
    connection.query(`SELECT * FROM ${table} WHERE ${idName} = '${id}'`, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function insert (table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

async function upsert (table, data) {
  let row
  if (data.id) {
    row = await get(table, data.id)
  } else {
    row = []
  }
  if (row.length === 0) {
    return insert(table, data)
  } else {
    return update(table, data)
  }
}

function update (table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

function query (table, query, join) {
  let joinQuery = ''
  if (join) {
    const key = Object.keys(join)[0]
    const val = join[key]
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
  }
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
      if (err) return reject(err)
      resolve(res[0] || null)
    })
  })
}

async function remove (tabla, id) {
  return true
}

module.exports = {
  list,
  get,
  insert,
  upsert,
  remove,
  query
}
