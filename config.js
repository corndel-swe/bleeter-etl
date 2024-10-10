import { createClient } from 'redis'
import knex from 'knex'

export const knex = knex({
  client: 'sqlite',
  connection: {
    filename: new URL('./sources/bleeter.sqlite', import.meta.url).pathname
  },
  useNullAsDefault: true
})

export const redis = createClient()
