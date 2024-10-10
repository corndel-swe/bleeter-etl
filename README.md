# Bleeter ETL

Welcome back to Bleeter, the sheepish micro-blogging platform!

Things are going from strength to strength at Bleeter, but we have started
running into some issues with our data storage solutions. Baa.

## Issues

- our user sessions are currently being stored in CSV files - reading and
  writing to CSV rows is costing us a fortune in compute time and bottlenecks
  are causing bugs with our authentication system

- the `notifications` table in our old SQL database is getting into deadlocks
  due to the high frequency of reads and writes so the app feels slow and lame

- our process for ranking hashtages by popularity is seriously inefficient -
  every time the app loads we're reading every bleet in the database!

- people are forever uploading images with no alt text and we are understandably
  being criticised for the lack of accessibility

## Solution

We've identified [Redis](https://redis.io/) as a possible solution for the
problems we're having. Redis is a NoSQL database which we want to use to solve
the issues.

- we could store user session data in Redis, meaning cheaper server costs and
  fewer bugs

- we could store our notifications in Redis, which eases the burden on our SQL
  database and could even support push notifications rather than refreshing to
  see new notifications

- we could rank hashtags as a routine task and cache the results in Redis
  instead of recalculating with every app load

- we could use an LLM to generate ALT text for images, and store the text for
  each image in Redis and load it alongside the image when users visit the page

## Getting started

In this repo, you are essentially going to be extracting data from one source,
transforming it, and then loading it into a Redis database. These tasks can be
done in almost any programming language and there is no "right answer" - Bleeter
is in an experimental stage so try to focus on exploring and researching rather
then getting everything perfect.

If you are working on your local machine, you will need to get
[Redis Stack](https://redis.io/docs/latest/operate/oss_and_stack/install/install-stack/)
installed. (Redis Stack contains more features than regular Redis.)

Take a look at the `TODO.md` to see what your tasks are in more detail.
