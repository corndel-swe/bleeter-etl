import { redis } from '../redis.js'

export async function loadSessionsToRedis(sessionId, data) {
  try {
    await redis.set(`session:${sessionId}`, JSON.stringify(data))
  } catch (error) {
    console.error('Error storing data in Redis:', error)
    throw error
  } finally {
    await redis.quit()
  }
}
