# Todo

There are some different data sources in the `sources` folder. We'd recommend
working in the following order:

## 0. Check that Redis works

- [ ] Try storing and reading a simple key-value pair in Redis and see if it
      works.

- [ ] Try storing and reading a JSON object in Redis and see if it works.

## 1. User session data

There is a CSV file in `sources` called `sessions`.

- [ ] Read the CSV file using your preferred programming language

- [ ] Transform each row into a JSON representation

- [ ] Store the JSON representation in Redis

## 2. Notification data

There is a table in the `bleeter.sqlite` database called `notifications`.

- [ ] Extract the data from the table

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

## 4. Images

> [!NOTE]
>
> This is an involved task and is intended as an open-ended challenge for anyone
> who completes steps 0. to 3. Approach it with a problem-solving mindset but
> don't worry if you don't get it complete.

There are several images in the `images` folder which users have shared on our
platform without alt text.

Use an LLM to create a alt tag text for each image, and store the alt text in
Redis with the name of the image. E.g.

```
alt:image_1 : "A wooden path leads out to the beach."
```

There are too many images here to do by hand, and more are being shared every
day, so we'll need some way of automating this.
