function transform(lines) {
  const hashtagCounts = {}
  const hashtagRegex = /#\w+/g

  lines.forEach(line => {
    const hashtags = line.match(hashtagRegex)
    if (hashtags) {
      hashtags.forEach(hashtag => {
        hashtag = hashtag.toLowerCase() // Normalize hashtags
        hashtagCounts[hashtag] = (hashtagCounts[hashtag] || 0) + 1
      })
    }
  })

  return hashtagCounts
}
