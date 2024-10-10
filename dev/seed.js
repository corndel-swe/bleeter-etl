// seed.js

import { development } from '../knexfile.js' // Adjust the path if necessary
import knex from 'knex'
import { faker } from '@faker-js/faker'
import jwt from 'jsonwebtoken' // Import jsonwebtoken for JWT creation
import fs from 'fs'
import { Parser } from 'json2csv' // Library to convert JSON to CSV

// Connect to the database
const db = knex(development)

async function seedDatabase() {
  try {
    // Generate a signing key for JWTs
    const jwtSigningKey =
      '2d3dd4cd721883cdc040c1e760826c8e2ed616f434ef885cbd8f6e5f72b4ebad'

    // Clear existing data
    await db('notifications').del()
    await db('comments').del()
    await db('likes').del()
    await db('bleets').del()
    await db('users').del()

    console.log('Seeding users...')
    const users = []
    for (let i = 0; i < 1000; i++) {
      users.push({
        user_id: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        created_at: faker.date.past().toISOString()
      })
    }
    // Batch size adjusted to 200
    await db.batchInsert('users', users, 200)
    console.log('Inserted users:', users.length)

    console.log('Generating hashtags...')
    // Generate a list of 50 hashtags
    const hashtags = Array.from({ length: 50 }, () => faker.word.noun())
    // Ensure some hashtags occur more frequently
    const popularHashtags = hashtags.slice(0, 20) // Top 20 hashtags are more popular

    console.log('Seeding bleets with hashtags...')
    const userIds = users.map(user => user.user_id)
    const bleets = []
    for (let i = 0; i < 10000; i++) {
      const bleetHashtags = []
      const numHashtags = faker.number.int({ min: 0, max: 3 }) // Each bleet has 0 to 3 hashtags

      for (let j = 0; j < numHashtags; j++) {
        let hashtag
        if (faker.number.int({ min: 1, max: 100 }) <= 70) {
          // 70% chance to pick from popular hashtags
          hashtag = faker.helpers.arrayElement(popularHashtags)
        } else {
          hashtag = faker.helpers.arrayElement(hashtags)
        }
        bleetHashtags.push(`#${hashtag}`)
      }

      const content = `${faker.lorem.sentence()} ${bleetHashtags.join(' ')}`
      bleets.push({
        bleet_id: faker.string.uuid(),
        user_id: faker.helpers.arrayElement(userIds),
        content: content,
        created_at: faker.date.past().toISOString()
      })
    }
    // Batch size adjusted to 200
    await db.batchInsert('bleets', bleets, 200)
    console.log('Inserted bleets:', bleets.length)

    // Map for quick lookup
    const bleetMap = new Map(bleets.map(bleet => [bleet.bleet_id, bleet]))

    console.log('Seeding comments...')
    const comments = []
    for (let i = 0; i < 10000; i++) {
      const bleetId = faker.helpers.arrayElement(bleets.map(b => b.bleet_id))
      const bleet = bleetMap.get(bleetId)
      let commenterId = faker.helpers.arrayElement(userIds)
      // Ensure the commenter is not the bleet owner
      while (commenterId === bleet.user_id) {
        commenterId = faker.helpers.arrayElement(userIds)
      }
      comments.push({
        comment_id: faker.string.uuid(),
        bleet_id: bleetId,
        user_id: commenterId,
        comment_text: faker.lorem.sentence(),
        created_at: faker.date.past().toISOString()
      })
    }
    // Batch size adjusted to 199
    await db.batchInsert('comments', comments, 199)
    console.log('Inserted comments:', comments.length)

    // Map for comments
    const commentMap = new Map(
      comments.map(comment => [comment.comment_id, comment])
    )

    console.log('Seeding likes...')
    const likes = []
    const likeSet = new Set()
    for (let i = 0; i < 100000; i++) {
      const userId = faker.helpers.arrayElement(userIds)
      const bleetId = faker.helpers.arrayElement(bleets.map(b => b.bleet_id))
      const bleet = bleetMap.get(bleetId)
      // Ensure the liker is not the bleet owner
      if (userId === bleet.user_id) {
        continue
      }
      const key = `${userId}-${bleetId}`
      if (!likeSet.has(key)) {
        likeSet.add(key)
        likes.push({
          like_id: faker.string.uuid(),
          user_id: userId,
          bleet_id: bleetId,
          created_at: faker.date.past().toISOString()
        })
      }
    }
    // Batch size adjusted to 200
    await db.batchInsert('likes', likes, 200)
    console.log('Inserted likes:', likes.length)

    // Map for likes
    const likeMap = new Map(likes.map(like => [like.like_id, like]))

    console.log('Seeding notifications...')
    const notifications = []

    // Notifications for comments
    comments.forEach(comment => {
      const bleet = bleetMap.get(comment.bleet_id)
      if (bleet && bleet.user_id !== comment.user_id) {
        notifications.push({
          notification_id: faker.string.uuid(),
          user_id: bleet.user_id, // Recipient
          notification_type: 'new comment on your post',
          bleet_id: bleet.bleet_id,
          comment_id: comment.comment_id,
          created_at: comment.created_at
        })
      }
    })

    // Notifications for likes
    likes.forEach(like => {
      const bleet = bleetMap.get(like.bleet_id)
      if (bleet && bleet.user_id !== like.user_id) {
        notifications.push({
          notification_id: faker.string.uuid(),
          user_id: bleet.user_id, // Recipient
          notification_type: 'new like for your post',
          bleet_id: bleet.bleet_id,
          like_id: like.like_id,
          created_at: like.created_at
        })
      }
    })

    // Shuffle notifications
    notifications.sort(() => Math.random() - 0.5)

    // Batch size adjusted to 140
    await db.batchInsert('notifications', notifications, 140)
    console.log('Inserted notifications:', notifications.length)

    console.log('Seeding completed!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }

  // Now, generate user sessions and write them to a CSV file
  console.log('Generating sessions and writing to CSV...')
  const sessions = []
  const deviceTypes = ['Desktop', 'Mobile', 'Tablet']
  const countries = [
    'USA',
    'Canada',
    'UK',
    'Australia',
    'Germany',
    'France',
    'India',
    'Brazil',
    'Japan',
    'South Africa'
  ]

  for (let i = 0; i < 5000; i++) {
    const userId = faker.helpers.arrayElement(users.map(user => user.user_id))
    const sessionStart = faker.date.past()
    const sessionDuration = faker.number.int({
      min: 5 * 60 * 1000,
      max: 2 * 60 * 60 * 1000
    }) // 5 minutes to 2 hours in milliseconds
    const sessionEnd = new Date(sessionStart.getTime() + sessionDuration)
    const ipAddress = faker.internet.ip()
    const deviceType = faker.helpers.arrayElement(deviceTypes)
    const country = faker.helpers.arrayElement(countries)

    // Generate JWT token with user_id in the payload
    const payload = { user_id: userId }
    const sessionToken = jwt.sign(payload, jwtSigningKey, { expiresIn: '2h' })

    sessions.push({
      session_id: faker.string.uuid(),
      user_id: userId,
      session_start: sessionStart.toISOString(),
      session_end: sessionEnd.toISOString(),
      ip_address: ipAddress,
      device_type: deviceType,
      country: country,
      session_token: sessionToken
    })
  }

  // Define CSV fields
  const csvFields = [
    'session_id',
    'user_id',
    'session_start',
    'session_end',
    'ip_address',
    'device_type',
    'country',
    'session_token'
  ]

  // Convert sessions data to CSV format
  const json2csvParser = new Parser({ fields: csvFields })
  const csv = json2csvParser.parse(sessions)

  // Write CSV data to file
  fs.writeFileSync('sessions.csv', csv)
  console.log('Sessions data written to sessions.csv')

  console.log('Seeding completed!')
  process.exit(0)
}

seedDatabase()
