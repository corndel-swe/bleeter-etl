async function extract(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    return fileContent.split('\n') // Return an array of lines
  } catch (error) {
    console.error('Error reading file:', error)
    throw error
  }
}
