import { extractCSV } from '../extract/extractCSV.js'
import { transformSessionData } from '../transform/transformSessionData.js'
import { connectRedis, loadToRedis, quitRedis } from '../load/loadToRedis.js'

async function etlPipeline(filePath) {
  await connectRedis()

  extractCSV(
    filePath,
    async row => {
      const transformedData = transformSessionData(row)
      const sessionId = transformedData['session_id']
      await loadToRedis(sessionId, transformedData)
    },
    () => {
      console.log('CSV file successfully processed and loaded into Redis')
      quitRedis()
    }
  )
}

const csvFilePath = './sources/sessions.csv'
etlPipeline(csvFilePath)
