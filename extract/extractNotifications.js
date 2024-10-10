import { db } from '../knex.js'

export async function extractNotifications() {
  const notifications = await db('notifications').select('*')
  return notifications
}
