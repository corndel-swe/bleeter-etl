import { redis, db } from '../config.js'
import fs from 'fs/promises'

async function extractDB() {
  const rows = await db.raw('select * from bleets')
  db.destroy()
  return rows.map(bleet => bleet.content)
}

async function extractFile() {
  const file = new URL('../sources/bleets_archive.txt', import.meta.url)
  const data = await fs.readFile(file, 'utf8')
  const lines = data.split('\n')
  return lines
}

async function transform(bleets) {
  const counts = new Map()
  const pattern = /#(\w+)/g

  for (const bleet of bleets) {
    const hashtags = bleet.match(pattern) || []

    hashtags.forEach(hashtag => {
      counts.set(hashtag, (counts.get(hashtag) || 0) + 1)
    })
  }

  return counts
}

async function load(counts) {
  await redis.connect()

  for (const [hashtag, count] of counts) {
    console.log(`Storing ${hashtag} with count ${count}`)
    await redis.set(`hashtag:${hashtag}`, count)
  }

  await redis.disconnect()
}

async function pipeline() {
  const dbBleets = await extractDB()
  const fileBleets = await extractFile()
  const bleets = [...dbBleets, ...fileBleets]
  const counts = await transform(bleets)
  await load(counts)
}

pipeline()
