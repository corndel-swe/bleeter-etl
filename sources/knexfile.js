// knexfile.js

const filename = new URL('./bleeter.sqlite', import.meta.url).pathname

export const development = {
  client: 'sqlite3',
  connection: { filename },
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done) // Enforce foreign keys
    }
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
}
