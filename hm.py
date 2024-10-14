import redis


def test_redis_connection():
    try:
        # Connect to Redis
        client = redis.StrictRedis(host='localhost', port=6379, db=0)

        # Set a key-value pair in Redis
        client.set('testKey', 'Hello from Python!')

        # Retrieve the value for the key
        value = client.get('testKey')

        # Print the retrieved value
        if value:
            print(f"testKey: {value.decode('utf-8')}")
        else:
            print("Could not retrieve the value for 'testKey'.")

    except Exception as e:
        print(f"Error connecting to Redis: {e}")


if __name__ == "__main__":
    test_redis_connection()
