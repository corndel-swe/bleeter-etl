import { redis, db } from '../config.js'

async function extract() {
  const rows = await db.raw('select * from notifications')
  db.destroy()
  return rows
}

async function load(notifications) {
  await redis.connect()

  for (const notification of notifications) {
    await redis.json.set(
      `notification:${notification.notification_id}`,
      '$',
      notification
    )
  }

  await redis.disconnect()
}

async function pipeline() {
  const notifications = await extract()
  await load(notifications)
  return
}

await pipeline()
