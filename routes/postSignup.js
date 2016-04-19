require('isomorphic-fetch');
var Member = require('../models/member'),
    slack = require('../helpers/slack'),
    qs = require('querystring'),
    settings;

try {
  settings = require('../settings');
} catch (e) {
  console.log('Please create a settings.js file. A sample has been provided in the root directory.');
  settings = {
    bot: {
      reporting: { active: false }
    }
  };
}

module.exports = function(request, response) {
  var member = new Member(request.body.member);

  if (member.save()) {
    var props = slack.getProps(member, request.body.extra);
    var form = new FormData();
    form.append('t', props.form.t);
    form.append('first_name', props.form.first_name);
    form.append('last_name', props.form.last_name);
    form.append('email', props.form.email);
    form.append('token', props.form.token);
    form.append('set_active', props.form.set_active);
    form.append('channels', props.form.channels);

    fetch(props.inviteUrl, {
      method: 'POST',
      body: form
    })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        } else {
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .then(res => res.json())
      .then(res => {
        if (!res.ok) { throw new Error(res.error); }
        if (settings.bot.reporting.active) {
          var data = qs.stringify({
            token: props.form.token,
            username: settings.bot.name,
            channel: settings.bot.reporting.channel,
            text: `${member.name} [${member.email}] has been invited to Frontend Developers.`
          });
          fetch(props.channelUrl + data);
        }
        response.redirect(302, request.body.extra.redirect_uri);
      })
      .catch(err => {
        if (settings.bot.reporting.active) {
          var data = qs.stringify({
            token: props.form.token,
            username: settings.bot.name,
            channel: settings.bot.reporting.channel,
            text: `An error has occurred attempting to invite ${member.email}. ${err}`
          });
          fetch(props.channelUrl + data);
        }
        response.status(422).send("Couldn't save member.");
      });
  }
};
