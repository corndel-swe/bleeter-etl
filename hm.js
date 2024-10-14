import redis from 'redis'

// Create a Redis client
const client = redis.createClient({
  url: 'redis://localhost:6379'  // Modify the URL if needed (for example, use the container IP)
});

(async () => {
  try {
    // Connect to Redis
    await client.connect();
    console.log("Connected to Redis!");

    // Set a key-value pair
    await client.set('testKey', 'Hello from Codespaces!');

    // Get the value of the key
    const value = await client.get('testKey');
    console.log('testKey:', value);

    // Disconnect from Redis
    await client.quit();
    console.log("Disconnected from Redis!");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
})();
