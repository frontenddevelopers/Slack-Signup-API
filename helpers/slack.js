var Qs = require('qs');

module.exports = {
  getProps: function(member, extra) {
    requestProps = {}
    requestProps.url = 'https://' + member.team + '.slack.com/api/users.admin.invite';

    requestProps.form = {
      t: (new Date).getTime(),
      token: process.env.SLACK_TOKEN,
      first_name: member.name,
      email: member.email,
      channels: extra.slack_channels,
      set_active: true,
      _attempts: 1
    };

    return requestProps;
  }
}
