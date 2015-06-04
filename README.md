# Slack Signup API

Requires:
Mongo DB
NodeJS

Setup:
Run mongoJS:
```
 mongod --dbpath db/
```
Run app.coffee
```
 coffee app.coffee
```

You could also compile to js (would run quicker):
```
 coffee -c app.coffee
 node app.js
```

May be worth putting in a cron job for every 10 mins:
```
 crontab -e

*/10 * * * * /path/to/script
```
