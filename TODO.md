# Todo

There are some different data sources in the `sources` folder. We'd recommend
working in the following order:

## 0. Check that Redis works

- [ ] Try storing and reading a simple key-value pair in Redis and see if it
      works.

- [ ] Try storing and reading a JSON object in Redis to see if it works.

## 1. User session data

There is a CSV file in `sources` called `sessions`.

- [ ] Read the CSV file

- [ ] Transform each row into a JSON representation

- [ ] Store the JSON representation in Redis
