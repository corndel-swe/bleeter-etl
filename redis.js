import { createClient } from 'redis'

export const redis = createClient()
redisClient.on('error', err => console.error('Redis Client Error', err))

export async function connectRedis() {
  await redis.connect()
}

export function quitRedis() {
  redis.quit()
}
