import knex from 'knex'
import { createClient } from 'redis'

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './sources/bleeter.sqlite'
  },
  useNullAsDefault: true
})

const redis = createClient({
  url: 'redis://localhost:6379'
})

export { db, redis }
