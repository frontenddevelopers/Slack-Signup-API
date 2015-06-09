var requestLib = require('request'),
    Member = require('../models/member'),
    slack = require('../helpers/slack');

module.exports = function(request, response) {
  var member = new Member(request.body.member);

  if (member.save()) {
    // Post to Slack
    requestLib.post(slack.getProps(member, request.body.extra));

    // Redirect to given website
    response.redirect(302, request.body.extra.redirect_uri);
  } else {
    // Send failure status
    response.status(422).send("Couldn't save member.");
  }
};
