#!/usr/bin/env coffee
setTimeout (->process.kill()),10000
keys = require './keys.json'
_ = require 'underscore'
request = require 'request'
db = require('mongojs')('test').collection 'emails'
db.find {},(e,docs)->
  console.log docs.length
  request 'https://api.typeform.com/v0/form/Ei4XtB?key='+keys.typeform+'&completed=true&offset='+docs.length,(e,res,body)->
     _.chain(JSON.parse(body).responses).pluck('answers').pluck('email_3201919').difference(_(docs).pluck('email')).value().forEach (val)->
      if val
        db.insert {email:val}
        console.log 'Invited: ',val
        request.post (['https://frontenddevelopers.slack.com/api/users.admin.invite?t=1416723927&token='+keys.slack+'&email=',val,'&channels=C03AP6ZSP%2CC039RTCV5&first_name= &last_name=&token='+keys.slack+'&set_active=true&_attempts=1'].join(''))
    console.log 'Done!'
