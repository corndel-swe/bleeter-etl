# Todo

There are different data sources in the `sources` folder. We'd recommend working
in the following order:

## 0. Check that Redis works

- [ ] Try storing and reading a simple key-value pair in Redis and see if it
      works.

  - [Python](https://redis.io/docs/latest/develop/connect/clients/python/redis-py/)
  - [JavaScript](https://redis.io/docs/latest/develop/connect/clients/nodejs/)
  - [Java](https://redis.io/docs/latest/develop/connect/clients/java/jedis/)
  - [C#](https://redis.io/docs/latest/develop/connect/clients/dotnet/)

- [ ] Try storing and reading a JSON object in Redis and see if it works.

  - [Python](https://redis.io/docs/latest/develop/connect/clients/python/redis-py/#example-indexing-and-querying-json-documents)
  - [JavaScript](https://tech-docs.corndel.com/express/redis#install-redis-client)
  - [Java]()
  - [C#](https://redis.io/docs/latest/develop/connect/clients/dotnet/#example-indexing-and-querying-json-documents)

## 1. User session data

There is a CSV file in `sources` called `sessions`.

- [ ] Read the CSV file using your preferred programming language

- [ ] Transform each row into a JSON representation

- [ ] Store the JSON representation in Redis

## 2. Notification data

There is a table in the `bleeter.sqlite` database called `notifications`.

- [ ] Extract the data from the table using your preferred programming language

- [ ] Transform each row into a JSON representation

- [ ] Store the JSON representation in Redis

**Optional extension**

There are two different types of notification: comments and likes. Make an index
for each type of notification to speed up searching and querying.

## 3. Hashtags

There is a `bleets_archive.txt` file in the `sources` folder.

- [ ] Read the file using your preferred programming language

- [ ] Count the occurences of each hashtag

- [ ] Store the count for each hashtag as a key value pair in Redis, e.g.
      `hashtag:winning : 73`

**Optional extension**

There is also a table of `bleets` in the `bleeter.sqlite` database which
contains hashtags! Include the hashtag counts from the database table as well as
the text file.

Great work! You've learned how to extract data from .
