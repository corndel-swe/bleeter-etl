import { redis } from '../redis.js'

async function load(hashtagCounts) {
  try {
    for (const [hashtag, count] of Object.entries(hashtagCounts)) {
      await redis.set(`hashtag:${hashtag}`, count)
    }
    console.log('Hashtag counts have been stored in Redis.')
  } catch (error) {
    console.error('Error storing data in Redis:', error)
    throw error
  } finally {
    await redis.quit()
  }
}
