ScrapeMind
==============

ScrapeMind :  takes in the various tasks (sraping/custom) and sends to scrape-mind and updates the status of various engines to redis queue.

How to run?

1. Redis server should be running
2. To configure redis change port etc in the config file:
```
"redisConfig": {
        "host": "localhost",
        "port": XXXX,
        "ttl": XXXX
    }

```
3.Change app port in config file(default 3000):
```
"port": 3000
```
4.RUN APP:
```
npm install
node app.js
```
