import { redis } from '../config.js'
import fs from 'fs/promises'

async function extract() {
  const file = new URL('../sources/sessions.csv', import.meta.url)
  const data = await fs.readFile(file, 'utf8')
  const lines = data.split('\n')
  return lines
}

function transform(lines) {
  console.log(`Transforming ${lines.length} sessions...`)
  const header = lines.shift().split(',')

  const sessions = lines.map(line => {
    const row = line.split(',')
    const record = {}

    for (let i = 0; i < header.length; i++) {
      record[header[i]] = row[i]
    }
    console.log(record)
    return record
  })

  return sessions
}

async function load(sessions) {
  await redis.connect()

  for (const session of sessions) {
    await redis.json.set(`session:${session.session_id}`, '$', session)
  }

  await redis.disconnect()
}

async function pipeline() {
  const data = await extract()
  const sessions = transform(data)
  await load(sessions)
}

pipeline()
