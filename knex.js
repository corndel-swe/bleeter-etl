import knex from 'knex'

const filename = new URL('./sources/bleeter.sqlite', import.meta.url).pathname

const config = {
  client: 'sqlite',
  connection: { filename },
  useNullAsDefault: true
}

export const db = knex(config)
