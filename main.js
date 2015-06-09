var express = require('express'),
    bodyParser = require('body-parser'),
    headers = require('./config/headers'),
    signup = require('./routes/signup'),
    db = require('./db'),
    app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', headers.allowOrigin);
  res.setHeader('Access-Control-Allow-Methods', headers.allowMethods);
  res.setHeader('Access-Control-Allow-Headers', headers.allowHeaders);
  next();
});

app.use('/signup', signup);

module.exports = app;
