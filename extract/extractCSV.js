import fs from 'fs'
import csv from 'csv-parser'

export function extractCSV(filePath, onData, onEnd) {
  fs.createReadStream(filePath).pipe(csv()).on('data', onData).on('end', onEnd)
}
