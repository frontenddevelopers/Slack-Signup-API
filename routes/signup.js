var express = require('express'),
    postSignup = require('./postSignup'),
    router = express.Router();

router.post('/', postSignup);

module.exports = router;
