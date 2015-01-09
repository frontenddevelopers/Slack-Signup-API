#!/usr/bin/env coffee
request = require 'request'
request 'https://slack.com/api/users.list?token=xoxp-3331214327-3349545555-3365091811-9c50c8',(e,res,body)->
  request 'https://api.typeform.com/v0/form/Ei4XtB?key=2d9ef2654a37c51cb48e32fca5024eebc3b09bd8&completed=true&offset='+JSON.parse(body).members.length,(e,res,body)->
    JSON.parse(body).responses.forEach (a)->
      request.post (['https://frontenddevelopers.slack.com/api/users.admin.invite?t=1416723927&token=xoxp-3331214327-3349545555-3365091811-9c50c8&email=',
      a.answers.email_3201919,
      '&channels=C03AP6ZSP%2CC039RTCV5&first_name=',
      a.answers.textarea_3201918,
      '&last_name=&token=xoxs-3331214327-3349545555-3349545567-b1cbc9f1b2&set_active=true&_attempts=1'].join('')),{}
      ,(e,res,body)->if JSON.parse(body).error then console.log JSON.parse(body).error
