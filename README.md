# Bleeter ETL

Welcome back to Bleeter, the sheepish micro-blogging platform!

Things are going from strength to strength at Bleeter, but we have started
running into some issues with our data storage solutions. Baa.

## Issues

- Our user sessions are currently being stored in CSV files - reading and
  writing to CSV rows is costing us a fortune in compute time and bottlenecks
  are causing bugs with our authentication system.

- The `notifications` table in our old SQL database is getting into deadlocks
  due to the high frequency of reads and writes so the app feels slow and lame.

- Our process for ranking hashtages by popularity is seriously inefficient -
  every time the app loads we're reading every bleet in the database!

- People are forever uploading images with no alt text and we are understandably
  being criticised for the lack of accessibility.

## Solution

We've identified [Redis](https://redis.io/) as a possible solution for the
problems we're having. Redis is a NoSQL database which we want to use to solve
the issues.

- We could store **user session data** in Redis, meaning cheaper server costs
  and fewer bugs

- We could store our **notifications** in Redis, which eases the burden on our
  SQL database and could even support push notifications rather than refreshing
  to see new notifications

- We could **rank hashtags** as a routine task and cache the results in Redis
  instead of recalculating with every app load

- We could use an LLM to generate **ALT text** for images, and store the text
  for each image in Redis and load it alongside the image when users visit the
  page

## Getting started

In this repo, you are going to be extracting data from one source, transforming
it, and then loading it into a Redis database. These tasks can be done in almost
any programming language and there is no "right answer" - Bleeter is in an
experimental stage so try to focus on exploring and researching rather than
getting everything perfect.

There are two ways to get up and running:

### Option 1: Codespaces (recommended)

If you are able to use Github Codespaces, it means you don't need to install
anything locally.

1. At the top right of this repo on github.com, you'll see a green button that
   says `<> Code`.

2. Click it, switch to the _Codespaces_ tab, and click "Create codespace on
   main".

The Codespace has Redis pre-installed, so there is nothing more to do.

### Option 2: Working locally

If you are working on your local machine, you will need to get
[Redis Stack](https://redis.io/docs/latest/operate/oss_and_stack/install/install-stack/)
installed. (Redis Stack contains more features than regular Redis.)

## Moving on

There are some docs available on working with Redis in various programming
languages:

- [JS](https://tech-docs.corndel.com/express/redis)
- [Python](https://tech-docs.corndel.com/flask/redis)
- [Java](https://tech-docs.corndel.com/javalin/redis)
- [C#](https://tech-docs.corndel.com/dotnet/redis)

Remember also that there are tech docs to help you with:

- setting up a project

- working with the file system

- reading from a database

which will all be useful.

Take a look at the `TODO.md` to see what your tasks are in more detail.
