import { createClient } from 'redis'

const redisClient = createClient()
redisClient.on('error', err => console.error('Redis Client Error', err))

export async function connectRedis() {
  await redisClient.connect()
}

export async function loadToRedis(sessionId, data) {
  await redisClient.json.set(`session:${sessionId}`, '$', data)
}

export function quitRedis() {
  redisClient.quit()
}
