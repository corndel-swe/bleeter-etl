// knexfile.js

export const development = {
  client: 'sqlite3',
  connection: {
    filename: './bleeter.sqlite' // SQLite database file
  },
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
