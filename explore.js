import redis from 'redis'
const client = redis.createClient({ url: 'redis://localhost:6379' })

client.on('connect', () => console.log('Connected to Redis'))

async function explore() {
  await client.connect()
  const keys = await client.keys('*')

  for (const key of keys) {
    const value = await client.json.get(key)
    console.log(`Key: ${key}, Value: ${JSON.stringify(value)}`)
  }

  await client.quit()
}

explore()
