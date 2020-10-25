'use strict'

const db = {
  user: [
    { id: '1', name: 'Steven' }
  ]
}

async function list (table) {
  return db[table] || []
}

async function get (table, id) {
  const col = await list(table)
  return col.filter(item => item.id === id)[0] || null
}

async function upsert (table, data) {
  if (!db[table]) {
    db[table] = []
  }

  db[table].push(data)

  console.log(db)
}
module.exports = {
  get,
  upsert
}
