#!/usr/bin/env coffee
keys = require './keys.json'
request = require 'request'
db = require('mongojs')('typeform').collection 'emails'
request 'https://slack.com/api/users.list?token='+keys.slack,(e,res,body)->
  request 'https://api.typeform.com/v0/form/Ei4XtB?key='+keys.typeform+'&completed=true&offset='+JSON.parse(body).members.length,(e,res,body)->
    console.log JSON.parse body
    #JSON.parse(body).responses.forEach (a)->
      #request.post (['https://frontenddevelopers.slack.com/api/users.admin.invite?t=1416723927&token='+keys.slack+'&email=',
      #a.answers.email_3201919,
      #'&channels=C03AP6ZSP%2CC039RTCV5&first_name=',
      #a.answers.textarea_3201918,
      #'&last_name=&token='+keys.slack+'&set_active=true&_attempts=1'].join('')),{}
      #,(e,res,body)->if JSON.parse(body).error then console.log JSON.parse(body).error
